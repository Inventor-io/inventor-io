const express = require('express');
require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const router = express.Router();
const db = require('knex')(require('../knexfile').development);

// HELPER FUNCTIONS

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

const retrieveRestaurantInventory = tempID =>
  db
    .where({ restaurant_id: tempID })
    .from('restaurant_inventory')
    .then(data => data);

const retrieveInventoryName = data => {
  const arr = data.map(obj => obj.ndbno);
  return db.whereIn('ndbno', arr).from('inventory');
};

const formatInventoryData = (data, inv) => {
  // create ndbno-name dict
  const invDict = {};
  inv.forEach(obj => {
    invDict[obj.ndbno] = obj.inventory_name;
  });

  // recreate front-end friendly object
  const newArr = data.map(obj => {
    const newObj = {};
    newObj.Quantity = obj.quantity;
    newObj.Item = invDict[obj.ndbno];
    newObj.Selected = false;
    return newObj;
  });
  return newArr;
};

const saveIngToInventoryDB = inventoryList =>
  db.insert(inventoryList).into('inventory');
// .catch(err => {
//   console.log('>>> err in err', err);
// });

const formatInventoryDataForDB = (inventoryList, tempID) => {
  const arr = [];
  inventoryList.forEach(obj => {
    const newObj = {};
    newObj.restaurant_id = tempID;
    newObj.ndbno = obj.ndbno;
    arr.push(newObj);
  });
  return arr;
};

const addInventoryToRestaurant = inventoryList => {
  // TODO: delete tempID when authorization complete
  const tempID = 1;

  return saveIngToInventoryDB(inventoryList).then(() => {
    const arr = formatInventoryDataForDB(inventoryList, tempID);
    return db.insert(arr).into('restaurant_inventory');
  });
};

// ROUTES TO /api/inventory

router.get('/', (req, res) => {
  // retrieve data from `restaurant_inventory` table
  // TODO: delete tempID after authorization
  const tempID = 1;

  retrieveRestaurantInventory(tempID).then(data => {
    retrieveInventoryName(data).then(inv => {
      const newArr = formatInventoryData(data, inv);
      res.send(newArr);
    });
  });
});

router.post('/usdaSearch', (req, res) => {
  // make usda api call
  const { searchTerm } = req.body;
  usdaQuerySearch(searchTerm).then(data => {
    let { item } = data.data.list;
    item = item.map(obj => {
      const newObj = {};
      newObj.ndbno = parseInt(obj.ndbno, 10);
      newObj.inventory_name = obj.name;
      return newObj;
    });
    res.send(item);
  });
});

router.post('/addIngToDB', (req, res) => {
  // save inventories to db
  const { ingObj } = req.body;

  addInventoryToRestaurant(ingObj)
    .then(() => {
      console.log('>>> inserted into DB!');
      res.sendStatus(200);
    })
    .catch(err => {
      // if (err.code === '23505') {
      //   res.send('duplicate');
      // } else {
      //   // console.log('>>> err!', err);
      // }
      console.log('>>> err', err);
    });
});

module.exports = router;
