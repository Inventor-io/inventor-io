const express = require('express');
const router = express.Router();
require('dotenv').config();
const db = require('knex')(require('../knexfile').development);

// UPDATE THE AMOUNT USED IN A RECIPE
router.patch('/ingredients', (req, res) => {
  console.log('UPDATE INGREDIENT RECEIVED');
  console.log(req.query);
  updateIngredientAmount(req.query, res);
});

async function updateIngredientAmount(query, res) {
  try {
    console.log('query in async:', query);
    await updateTheRow(query);
    console.log('Response sent.');
    res.sendStatus(200);
  } catch (e) {
    console.log('ERROR in updateIngredient:', e);
  }
}

const updateTheRow = query =>
  db('recipe_inventory')
    .where({ recipe_id: query.recipe_id, ndbno: query.ndbno })
    .update({ measurement: query.measurement });

// ADD A LIST OF INGREDIENTS TO A RECIPE

router.post('/ingredients', (req, res) => {
  console.log('ADD INGREDIENTS RECEIVED');
  const { ingObj, recipe, restaurant } = req.body;
  saveIngredients(ingObj, recipe, restaurant, res);
});

async function saveIngredients(ingObj, recID, restaurantID, res) {
  try {
    // TODO: this is a naive solution... just wanted to get it over with it
    const ndbnos = getndbnos(ingObj); // array of all ndbnos in request
    const exists = await checkRecipeIngredients(recID, ndbnos); // array of existing objects in recipe_inventory
    let filteredndbnos = filterndbnos(ndbnos, exists); // array of ndbnos not in recipe_inventory
    let filteredObjs = filterObjs(filteredndbnos, ingObj); // array of objects not in recipe_inventory
    // insert into db
    await saveIngToInventoryDB(filteredObjs); // insert to inventory table
    await saveIngToRecipeInventoryDB(recID, ndbnos); // insert to recipe_inventory table

    const restaurantNdbnos = await getRestaurantNdbnos(restaurantID);
    filteredndbnos = filterndbnos(filteredndbnos, restaurantNdbnos);
    filteredObjs = filterObjs(filteredndbnos, filteredObjs);
    await addInventoryToRestaurant(filteredObjs, restaurantID); // insert filteredObjs to restaurant_inventory
    console.log('SUCCESS');
    res.sendStatus(200);
  } catch (e) {
    console.log('ERROR ADDING INGREDIENTS:', e);
  }
}

const getRestaurantNdbnos = restaurantID =>
  db('restaurant_inventory')
    .where({ restaurant_id: restaurantID })
    .select('ndbno');

const addInventoryToRestaurant = (inventoryList, restaurantID) => {
  const arr = formatInventoryDataForDB(inventoryList, restaurantID);
  return db.insert(arr).into('restaurant_inventory');
};

const formatInventoryDataForDB = (ingObj, tempID) => {
  // for 'restaurant_inventory' table
  const arr = ingObj.map(obj => {
    const newObj = {};
    newObj.restaurant_id = tempID;
    newObj.ndbno = obj.ndbno;
    return newObj;
  });
  console.log('Formatted for Rest-Inv', arr);
  return arr;
};

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

const getndbnos = ingObj => ingObj.map(obj => obj.ndbno);

const checkRecipeIngredients = (recID, ndbnos) =>
  db
    .whereIn('ndbno', ndbnos)
    .andWhere({ recipe_id: recID })
    .from('recipe_inventory');

const filterndbnos = (ndbnos, exists) => {
  const noDupes = [...new Set(ndbnos)];
  const existingndbnos = exists.map(obj => obj.ndbno);
  const filtered = noDupes.filter(val => !existingndbnos.includes(val));
  return filtered;
};

const filterObjs = (filteredndbnos, ingObj) =>
  ingObj.filter(obj => filteredndbnos.includes(obj.ndbno));

const saveIngToRecipeInventoryDB = (recID, ndbnos) => {
  // save inventory to 'inventory' table
  const newRows = ndbnos.map(ndbno => ({
    recipe_id: Number.parseInt(recID, 10),
    ndbno,
  }));
  console.log('newRows', newRows);
  db.insert(newRows)
    .into('recipe_inventory')
    .then(() => console.log('SUCCESS!!'))
    .catch(e => console.log(e));
};

// DELETE INGREDIENT
router.delete('/ingredients', (req, res) => {
  console.log('DELETE RECIEVED');
  console.log('req.query', req.query);
  /* eslint-disable */
  const recipe_id = Number.parseInt(req.query.recipe_id);
  const ndbno = req.query.ndbno;
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
    console.log('Sending back', data.length, 'rows');
    res.send(data);
  } catch (e) {
    console.log('ERROR in getIngredients:', e);
  }
}
const queryIngredients = recipeID =>
  db('recipe_inventory')
    .join('inventory', 'recipe_inventory.ndbno', '=', 'inventory.ndbno')
    .where({ recipe_id: recipeID });

module.exports = router;
