const express = require('express');
const router = express.Router();
require('dotenv').config();
const db = require('knex')(require('../knexfile').development);

// DELETE INGREDIENT
router.delete('/ingredients', (req, res) => {
  console.log('DELETE RECIEVED');
  console.log('req.query', req.query);
  /* eslint-disable */
  const recipe_id = Number.parseInt(req.query.recipe_id);
  const { ndbno } = req.query.ndbno;
  deleteIngredient({ recipe_id, ndbno }, res);
  /* eslint-enable */
});
async function deleteIngredient(query, res) {
  try {
    console.log('query in async:', query);
    await deleteTheRow(query);
    console.log('Response sent.');
    res.sendStatus(200);
  } catch (e) {
    console.log('ERROR in getRecipes:', e);
  }
}
const deleteTheRow = query =>
  db('recipe_inventory')
    .where(query)
    .del();

// GET RECIPES
router.get('/get', (req, res) => {
  console.log('GET received at api/recipe/get');
  console.log('PATH', req.path);
  console.log('QUERY:', req.query);
  getRecipes(req.query.restaurant, res);
});

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

// GET LIST OF INGREDIENTS FOR A GIVEN RECIPE ID
router.get('/ingredients', (req, res) => {
  console.log('GET received at api/recipe/ingredients');
  console.log('PATH', req.path);
  console.log('QUERY:', req.query);
  getIngredients(req.query.recipe, res);
});

async function getIngredients(recipeID, res) {
  try {
    const data = await queryIngredients(recipeID);
    console.log('Sending back', data.length, 'rows.');
    res.send(data);
  } catch (e) {
    console.log('ERROR in getIngredients:', e);
  }
}
const queryIngredients = recipeID =>
  db.where({ recipe_id: recipeID }).from('recipe_inventory');

module.exports = router;
