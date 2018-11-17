const express = require('express');
const router = express.Router();
require('dotenv').config();
const db = require('knex')(require('../knexfile').development);

// GET RECIPES
router.get('/', (req, res) => {
  console.log('GET received at api/recipes/');
  const restaurantID = 1;
  getRecipes(restaurantID, res);
});
// ADD NEW RECIPE
router.post('/create', (req, res) => {
  console.log('POST received at api/recipe/create');
  addRecipe(req.body, res);
});

async function addRecipe(recipe, res) {
  try {
    console.log('TRYING TO INSERT', recipe);
    const data = await insertRecipe(recipe);
    console.log('Response sent.');
    res.send(data);
  } catch (e) {
    console.log('ERROR in addRecipe:', e);
  }
}

const insertRecipe = recipe => db.insert(recipe).into('recipes');

async function getRecipes(restaurantID, res) {
  try {
    const data = await queryRecipes(restaurantID);
    console.log('Response sent.');
    res.send(data);
  } catch (e) {
    console.log('ERROR in getRecipes:', e);
  }
}

const queryRecipes = restaurantID =>
  db.where({ restaurant_id: restaurantID }).from('recipes');

module.exports = router;
