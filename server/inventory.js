const express = require('express');
require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const router = express.Router();
const db = require('knex')(require('../knexfile').development);

// HELPER FUNCTIONS

const saveIngToDB = inventoryList =>
  // save object to db
  db.insert(inventoryList).into('inventory');

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

// ROUTES TO /api/inventory

router.get('/', (req, res) => {
  // retrieve data from `restaurant_inventory` table
  const data = [
    {
      Item: 'apple',
      Quantity: 3,
      Selected: false,
    },
    {
      Item: 'orange',
      Quantity: 4,
      Selected: true,
    },
  ];
  res.send(data);
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

  saveIngToDB(ingObj)
    .then(() => {
      console.log('>>> inserted into DB!');
      res.sendStatus(200);
    })
    .catch(err => {
      if (err.code === '23505') {
        res.send('duplicate');
      }
    });
});

module.exports = router;
