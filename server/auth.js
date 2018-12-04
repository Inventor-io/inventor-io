const express = require('express');
const router = express.Router();
const passport = require('passport');
const db = require('knex')(require('../knexfile').development);
// const FacebookStrategy = require('passport-facebook').Strategy;
require('dotenv').config();

router.get('/', (req, res) => {
  res.json('/api/login route');
});

router.post('/sales', (req, res) => {
  console.log('req.body :', req.body);
  const { salesList } = req.body.salesList;
  const formattedData = salesList.map(sale => ({
    recipe_id: sale.recipe_id,
    restaurant_id: sale.restaurant_id,
    quantity: sale.quantity,
    date: req.body.date,
  }));
  console.log('HI NIK:', formattedData);
  db.insert(formattedData)
    .into('sales')
    .then(() => res.send('hi'));
});
router.get('/login/facebook', passport.authenticate('facebook'));

router.get(
  '/login/facebook/return',
  passport.authenticate('facebook', {
    failureRedirect: '/login',
  }),
  (req, res) => {
    console.log('in the return function');
    res.redirect('https://localhost:3000/restaurant');
  },
);

module.exports = router;
