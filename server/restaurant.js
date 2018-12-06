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

router.post('/delete', (req, res) => {
  console.log(req.body);
  deleteRestaurant(req.body.id)
    .then(response => {
      console.log(response);
      res.status(201).end('hi');
    })
    .catch(err => {
      throw err;
    });
});

router.post('/update', (req, res) => {
  console.log('UPDATE', req.body);
  // {restaurantId, name, address, phoneNumber, website} = req.body;
  updateRestaurant(
    req.body.restaurantId,
    req.body.name,
    req.body.address,
    req.body.phoneNumber,
    req.body.website,
  ).then(response => {
    console.log(response);
    res.status(201).end('done');
  });
});

router.post('/getit', (req, res) => {
  console.log(req.body);
  const restaurantID = req.body.selectedRestaurant;

  // Object.keys(req.body)[0] ||
  const restaurantInfo = {};

  // const order = restaurantOrders(restaurantID);
  // const sales = restaurantSales(restaurantID);
  // const recipes = restaurantRecipes(restaurantID);
  // const recipInventory = recipeInventory(restaurantID);
  // const salesData = getSalesData(restaurantID);
  // const salesByDay = getSalesByDay(restaurantID);
  // const inventoryData = getInventoryData(restaurantID);

  // Promise.all([
  //   order,
  //   sales,
  //   recipes,
  //   recipInventory,
  //   salesData,
  //   salesByDay,
  //   inventoryData,
  // ]).then(response => {
  //   console.log('PROMISE ALLLLLL', response);
  //   console.log(response[0]);
  //   // res.status(201).json(response);
  // });
  restaurantOrders(restaurantID).then(orders => {
    Object.assign(restaurantInfo, { orders });
    restaurantSales(restaurantID).then(sales => {
      Object.assign(restaurantInfo, { sales });
      restaurantRecipes(restaurantID).then(recipes => {
        Object.assign(restaurantInfo, { recipes });
        recipeInventory(restaurantID).then(resInv => {
          Object.assign(restaurantInfo, { resInv });
          getSalesData(restaurantID).then(salesInfo => {
            Object.assign(restaurantInfo, { salesInfo: salesInfo.rows });
            getSalesByDay(restaurantID).then(daySales => {
              Object.assign(restaurantInfo, { daySales: daySales.rows });
              getInventoryData(restaurantID).then(inventoryData => {
                Object.assign(restaurantInfo, {
                  inventoryData: inventoryData.rows,
                });
                console.log(restaurantInfo);
                res.status(201).json(restaurantInfo);
              });
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

const getInventoryData = (restaurantId = 1) => {
  return db.raw(
    "SELECT  restaurant_inventory.quantity, inventory_name, sub.price_item*restaurant_inventory.quantity AS total_value, sub.* FROM (select ndbno, price/quantity AS price_item, date from (select ndbno, price, quantity, price/quantity AS price_item, date, row_number() over (partition by ndbno order by date desc) as rn from orders WHERE delivered='t') as T where rn=1) sub JOIN inventory ON inventory.ndbno = sub.ndbno JOIN restaurant_inventory ON sub.ndbno = restaurant_inventory.ndbno WHERE restaurant_inventory.restaurant_id=" +
      restaurantId +
      ';',
  );
};

const deleteRestaurant = restaurantId => {
  return db.raw('DELETE FROM restaurants WHERE id=' + restaurantId + ';');
};

const updateRestaurant = (
  restaurantId,
  name,
  address,
  phoneNumber,
  website,
) => {
  return db.raw(
    "UPDATE restaurants SET restaurants_name='" +
      name +
      "', restaurant_address='" +
      address +
      "', restaurant_phone_number=" +
      phoneNumber +
      ", restaurant_website='" +
      website +
      "' WHERE id=" +
      restaurantId +
      ';',
  );
};

module.exports = router;
