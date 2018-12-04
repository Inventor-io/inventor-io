const express = require('express');
const router = express.Router();
require('dotenv').config();
const db = require('knex')(require('../knexfile').development);

router.post('/list', (req, res) => {
  console.log(req.body);
  getRestaurants(req.body.userId).then(response => {
    // console.log(response);
    res.status(200).send(response);
  });
});

router.post('/create', (req, res) => {
  // console.log('SERVER', req.body);

  createNewRestaurant(req.body)
    .then(() => {
      // console.log(response);
      res.status(201).end('DB Save Success');
    })
    .catch(err => {
      throw err;
    });
  // res.status(201).send('Success');
});

router.post('/getit', (req, res) => {
  console.log(req.body);
  const restaurantID = req.body.selectedRestaurant;

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
          getSalesData().then(salesInfo => {
            Object.assign(restaurantInfo, { salesInfo: salesInfo.rows });
            getSalesByDay().then(daySales => {
              Object.assign(restaurantInfo, { daySales: daySales.rows });
              res.status(201).json(restaurantInfo);
            });
          });
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

const getSalesData = (restaurant_id = 1) =>
  db.raw(
    'SELECT recipe_name, recipes.price, inventory_name, sales.quantity, measurement, recipe_inventory.measurement*sales.quantity AS total_quantity,ROUND(CAST((orders.price/orders.quantity)*recipe_inventory.measurement AS numeric), 2) AS price_ingredient,  ROUND(CAST((orders.price/orders.quantity)*recipe_inventory.measurement*sales.quantity AS numeric), 2) AS total_cost_ingredient,sales.date FROM sales JOIN recipe_inventory ON sales.recipe_id=recipe_inventory.recipe_id JOIN inventory ON inventory.ndbno=recipe_inventory.ndbno JOIN recipes ON recipes.recipe_id=sales.recipe_id JOIN orders ON orders.ndbno=recipe_inventory.ndbno AND orders.date =(SELECT MAX(orders.date) FROM orders where orders.ndbno=recipe_inventory.ndbno) WHERE sales.restaurant_id=' +
      restaurant_id +
      ';',
  );

const getSalesByDay = (restaurant_id = 1) => {
  return db.raw(
    'SELECT recipe_name, SUM(price), date(date) as date FROM (SELECT recipe_name, price, quantity, date FROM sales JOIN recipes ON sales.recipe_id = recipes.recipe_id WHERE sales.restaurant_id=' +
      restaurant_id +
      ') as sales GROUP BY sales.recipe_name, sales.date order by date;',
  );
};

module.exports = router;
