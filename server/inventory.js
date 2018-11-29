const express = require('express');
require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const router = express.Router();
const db = require('knex')(require('../knexfile').development);

/* 
  GET: /api/inventory
*/
router.post('/', (req, res) => {
  const { id } = req.body;
  getInventory(id, res);
});

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

/* 
  POST: /api/inventory/usdaSearch
*/
router.post('/usdaSearch', (req, res) => {
  // make usda api call
  const { searchTerm } = req.body;

  getUSDA(searchTerm, res);
});

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

/* 
  POST: /api/inventory/addIngToDB
*/

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

/* 
  POST: /api/inventory/formatInv
*/
router.post('/formatInv', (req, res) => {
  const { orderndbnos, id } = req.body;
  const set = new Set(orderndbnos);
  const filtered = Array.from(set);
  formatOrderAsync(filtered, id, res);
});

async function formatOrderAsync(ndbnos, id, res) {
  // helper function
  const createForEachDict = (arr, key) => {
    const d = {};
    arr.forEach(obj => {
      d[obj.ndbno] = obj[key];
    });
    return d;
  };

  // get db for item name <-- 'inventory'
  const nameArr = await db.whereIn('ndbno', ndbnos).from('inventory'); // [{ndbno:'111', inventory_name: 'apple'}]
  const names = createForEachDict(nameArr, 'inventory_name');

  // get db for ast order amount <-- 'orders'
  const orderArr = await db
    .whereIn('ndbno', ndbnos)
    .andWhere('restaurant_id', id)
    .from('orders');
  const orders = createForEachDict(orderArr, 'quantity');

  // get db for current quantity <-- 'restaurant_inventory'
  const quantityArr = await db
    .whereIn('ndbno', ndbnos)
    .andWhere('restaurant_id', id)
    .from('restaurant_inventory');
  // get db for price <-- hash function
  const quantities = createForEachDict(quantityArr, 'quantity');

  const result = ndbnos.map(ndbno => {
    const returnObj = {};
    returnObj.ndbno = ndbno;
    returnObj.Price = 150; // TODO: fix
    returnObj.Quantity = quantities[ndbno];
    returnObj.Orders = orders[ndbno] ? orders[ndbno] : 0;
    returnObj.Item = names[ndbno];
    return returnObj;
  });

  res.send(result);
}

/* 
  POST: /api/inventory/orderInv
*/
router.post('/orderInv', (req, res) => {
  const { orderList, id } = req.body;
  const reformat = formatToSaveOrder(orderList, id);
  orderAsync(reformat, res);
});

const formatToSaveOrder = (arr, id) =>
  arr.map(obj => {
    const nObj = {};
    nObj.restaurant_id = id;
    nObj.ndbno = obj.ndbno;
    nObj.price = obj.Price;
    nObj.quantity = obj.Quantity;
    return nObj;
  });

async function orderAsync(orderArr, res) {
  try {
    await saveOrder(orderArr);
    res.sendStatus(200);
  } catch (e) {
    // console.log(e);
  }
}

const saveOrder = orderArr =>
  db
    .insert(orderArr)
    .into('orders')
    .catch(err => {
      if (err.code === '23505') {
        // console.log('Duplicate in inventory db... its ok');
      } else {
        // console.log('ERROR saving order to db', err);
      }
    });

/* 
POST: /api/inventory/deleteInventory
*/
router.post('/deleteInventory', (req, res) => {
  const { ndbno } = req.body;
  deleteInv(ndbno, res);
});

const knexDelInv = ndbno =>
  db
    .from('restaurant_inventory')
    .where({ ndbno })
    .del();
// .catch(e => {
//   console.log(e);
// });

async function deleteInv(ndbno, res) {
  try {
    await knexDelInv(ndbno);
    res.sendStatus(200);
  } catch (e) {
    // console.log(e);
  }
}

/*
POST: /api/inventory/fetchPrevOrders
*/

router.post('/fetchPrevOrders', (req, res) => {
  const { id } = req.body;
  db.from('orders')
    .where('restaurant_id', id)
    .orderBy('date', 'desc')
    .limit(20)
    .then(arr => formatOrderPretty(arr, res));
  // .catch(err => {
  //   console.log(err);
  // });
});

const formatOrderPretty = (arr, res) =>
  retrieveInventoryName(arr)
    .then(name => {
      const invDict = {};
      name.forEach(obj => {
        invDict[obj.ndbno] = obj.inventory_name;
      });
      return invDict;
    })
    .then(invDict => {
      const result = arr.map(obj => {
        const nObj = {};
        nObj.ndbno = obj.ndbno;
        nObj.Item = invDict[obj.ndbno];
        nObj.Orders = obj.quantity;
        nObj.Price = obj.price;
        nObj.Delivered = obj.delivered;
        nObj.Date = obj.date;
        return nObj;
      });
      res.send(result);
    });

/*
  export
*/
module.exports = router;
