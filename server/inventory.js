const express = require('express');
require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const router = express.Router();
const db = require('knex')(require('../knexfile').development);

// GET: /api/inventory
const retrieveRestaurantInventory = id =>
  db.where({ restaurant_id: id }).from('restaurant_inventory');

const retrieveInventoryName = data => {
  const arr = data.map(obj => obj.ndbno);
  return db.whereIn('ndbno', arr).from('inventory');
};

const formatInventoryData = (inventories, name) => {
  // create ndbno-name dict
  const invDict = {};
  name.forEach(obj => {
    invDict[obj.ndbno] = obj.inventory_name;
  });

  // recreate front-end friendly object
  const newArr = inventories.map(obj => {
    const newObj = {};
    newObj.Quantity = obj.quantity;
    newObj.Item = invDict[obj.ndbno];
    newObj.Selected = false;
    newObj.ndbno = obj.ndbno;
    return newObj;
  });
  return newArr;
};

async function getInventory(restaurantID, res) {
  try {
    const inventories = await retrieveRestaurantInventory(restaurantID);
    const names = await retrieveInventoryName(inventories);
    const data = formatInventoryData(inventories, names);
    res.send(data);
  } catch (e) {
    // console.log('ERROR in async function getInventory', e);
  }
}

// MAIN ROUTE
router.post('/', (req, res) => {
  const { id } = req.body;
  getInventory(id, res);
});

// POST: /api/inventory/usdaSearch
const usdaQuerySearch = searchTerm =>
  // make API call to USDA and receive ndbnos
  axios.get(`https://api.nal.usda.gov/ndb/search/?`, {
    params: {
      format: 'JSON',
      q: searchTerm,
      sort: 'r',
      max: 50,
      ds: 'Standard Reference',
      api_key: `${API_KEY}`,
    },
  });

const formatForDropdown = item => {
  const data = item.map(obj => {
    const newObj = {};
    newObj.ndbno = obj.ndbno;
    newObj.inventory_name = obj.name;
    return newObj;
  });
  return data;
};

async function getUSDA(searchTerm, res) {
  try {
    const queryObj = await usdaQuerySearch(searchTerm);
    const { item } = queryObj.data.list;
    const data = formatForDropdown(item);
    res.send(data);
  } catch (e) {
    // console.log('ERROR in async function getUSDA', e);
  }
}

// MAIN ROUTE
router.post('/usdaSearch', (req, res) => {
  // make usda api call
  const { searchTerm } = req.body;

  getUSDA(searchTerm, res);
});

// POST: /api/inventory/addIngToDB
const saveIngToInventoryDB = inventoryList =>
  // save inventory to 'inventory' table
  db
    .insert(inventoryList)
    .into('inventory')
    .catch(err => {
      if (err.code === '23505') {
        // console.log('Duplicate in inventory db... its ok');
      } else {
        // console.log('ERROR saving ing to inventory db');
      }
    });

const formatInventoryDataForDB = (ingObj, tempID) => {
  // for 'restaurant_inventory' table
  const arr = ingObj.map(obj => {
    const newObj = {};
    newObj.restaurant_id = tempID;
    newObj.ndbno = obj.ndbno;
    return newObj;
  });
  return arr;
};

const checkRestaurantInventory = (restaurantID, ndbnos) =>
  db
    .whereIn('ndbno', ndbnos)
    .andWhere({ restaurant_id: restaurantID })
    .from('restaurant_inventory');

const getndbnos = ingObj => ingObj.map(obj => obj.ndbno);

const addInventoryToRestaurant = (inventoryList, restaurantID) => {
  const arr = formatInventoryDataForDB(inventoryList, restaurantID);
  return db.insert(arr).into('restaurant_inventory');
};

const filterndbnos = (ndbnos, exists) => {
  const existingndbnos = exists.map(obj => obj.ndbno);
  const filtered = ndbnos.filter(val => !existingndbnos.includes(val));
  return filtered;
};

const filterObjs = (filteredndbnos, ingObj) =>
  ingObj.filter(obj => filteredndbnos.includes(obj.ndbno));

async function saveInv(ingObj, restaurantID, res) {
  try {
    // save inventory to restaurant_inventory table
    // TODO: this is a naive solution... just wanted to get it over with it
    const ndbnos = getndbnos(ingObj); // array of all ndbnos in request
    const exists = await checkRestaurantInventory(restaurantID, ndbnos); // array of existing objects in restaurant_inventory
    const filteredndbnos = filterndbnos(ndbnos, exists); // array of ndbnos not in restaurant_inventory
    const filteredObjs = filterObjs(filteredndbnos, ingObj); // array of objects not in restaurant_inventory

    // insert into db
    await saveIngToInventoryDB(filteredObjs); // insert to inventory table
    await addInventoryToRestaurant(filteredObjs, restaurantID); // insert filteredObjs to restaurant_inventory
    res.sendStatus(200);
  } catch (e) {
    // console.log('ERROR in async saveInv', e);
  }
}

router.post('/addIngToDB', (req, res) => {
  // save inventories to db
  const { ingObj, id } = req.body;
  saveInv(ingObj, id, res);
});

module.exports = router;

// POST: /api/inventory/orderInv
router.post('/orderInv', (req, res) => {
  res.send(req.body);
});
