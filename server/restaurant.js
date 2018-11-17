const express = require('express');
const router = express.Router();
require('dotenv').config();
const db = require('knex')(require('../knexfile').development);

router.get('/list', (req, res) => {
  console.log(req.body);
  getRestaurants().then(response => {
    console.log(response);
    res.status(200).send(response);
  });
});

router.post('/create', (req, res) => {
  console.log('SERVER', req.body);

  createNewRestaurant(req.body)
    .then(response => {
      console.log(response);
      res.status(201).end('DB Save Success');
    })
    .catch(err => {
      throw err;
    });
  // res.status(201).send('Success');
});

router.post('/getit', (req, res) => {
  const restaurantID = Object.keys(req.body)[0];
  res.status(201).end(restaurantID);
});

/*
restaurant = {
  restaurant_name,
  restaurant_address,
  restaurant_phone_number,
  restaurant_website,
}
*/
const createNewRestaurant = restaurant =>
  db.insert(restaurant).into('restaurants');

const getRestaurants = (user_id = 1) =>
  db.from('restaurants').where({ user_id });

module.exports = router;
