const express = require('express');
const router = express.Router();
require('dotenv').config();
const db = require('knex')(require('../knexfile').development);

router.post('/list', (req, res) => {
  console.log('inside post to list', req.body.userId);
  getRestaurants(req.body.userId).then(response => {
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
  const restaurantID = 1;
  // Object.keys(req.body)[0] ||
  const restaurantInfo = {};
  restaurantOrders(restaurantID).then(orders => {
    Object.assign(restaurantInfo, { orders });
    restaurantSales(restaurantID).then(sales => {
      Object.assign(restaurantInfo, { sales });
      restaurantRecipes(restaurantID).then(recipes => {
        Object.assign(restaurantInfo, { recipes });
        recipeInventory().then(resInv => {
          Object.assign(restaurantInfo, { resInv });
          res.status(201).json(restaurantInfo);
        });
      });
    });
  });
});

// recInv => {
// Object.assign(restaurantInfo, { recInv });
// restaurantInventory(restaurantID).then(
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

const restaurantOrders = (restaurant_id = 1) =>
  db.from('orders').where({ restaurant_id });

const restaurantSales = (restaurant_id = 1) =>
  db.from('sales').where({ restaurant_id });

const restaurantRecipes = (restaurant_id = 1) =>
  db.from('recipes').where({ restaurant_id });

const recipeInventory = (recipe_id = 1) =>
  db.from('recipe_inventory').where({ recipe_id });

/* eslint-disable */
const restaurantInventory = (restaurant_id = 1) =>
  db.from('restaurant_inventory').where({ restaurant_id });

module.exports = router;
