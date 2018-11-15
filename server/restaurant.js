const express = require('express');
const router = express.Router();
require('dotenv').config();
const db = require('knex')(require('../knexfile').development);

router.get('/', (req, res) => {
  console.log(req.body);
  res.status(200).send('/api/restaurant route');
});

router.post('/create', (req, res) => {
  console.log('SERVER', req.body);

  createNewRestaurant(req.body)
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      throw err;
    });
  res.status(201).send('Success');
});

/*
restaurant = {
  restaurant_name,
  restaurant_address,
  restaurant_phone_number,
  restaurant_website,
  created_at
}
*/
const createNewRestaurant = restaurant =>
  db.insert(restaurant).into('restaurants');

module.exports = router;
