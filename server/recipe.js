const express = require('express');
const router = express.Router();
require('dotenv').config();
const db = require('knex')(require('../knexfile').development);

// DELETE A RECIPE
router.delete('/', (req, res) => {
  deleteRecipe(req.query, res);
});

async function deleteRecipe(query, res) {
  try {
    await deleteRelatedIngredients(query);
    await deleteRecipeItself(query);
    const data = await queryRecipes(query.restaurant_id);
    res.send(data);
  } catch (e) {
    // console.log(e)
  }
}
const deleteRelatedIngredients = query =>
  db('recipe_inventory')
    .where({ recipe_id: query.recipe_id })
    .del();

const deleteRecipeItself = query =>
  db('recipes')
    .where({ recipe_id: query.recipe_id })
    .del();

// UPDATE THE AMOUNT USED IN A RECIPE
router.patch('/ingredients', (req, res) => {
  updateIngredientAmount(req.query, res);
});

async function updateIngredientAmount(query, res) {
  try {
    await updateTheRow(query);
    res.sendStatus(200);
  } catch (e) {
    // console.log('ERROR in updateIngredient:', e);
  }
}

const updateTheRow = query =>
  db('recipe_inventory')
    .where({ recipe_id: query.recipe_id, ndbno: query.ndbno })
    .update({ measurement: query.measurement });

// ADD A LIST OF INGREDIENTS TO A RECIPE

router.post('/ingredients', (req, res) => {
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
  db.insert(newRows).into('recipe_inventory');
  // .then(() => console.log('SUCCESS!!'))
  // .catch(e => console.log(e));
};

// DELETE INGREDIENT
router.delete('/ingredients', (req, res) => {
  /* eslint-disable */
  const recipe_id = Number.parseInt(req.query.recipe_id);
  const ndbno = req.query.ndbno;
  deleteIngredient({ recipe_id, ndbno }, res);
  /* eslint-enable */
});
async function deleteIngredient(query, res) {
  try {
    await deleteTheRow(query);
    res.sendStatus(200);
  } catch (e) {
    // console.log('ERROR in deleteIngredient:', e);
  }
}
const deleteTheRow = query =>
  db('recipe_inventory')
    .where(query)
    .del();

// GET RECIPES
router.get('/get', (req, res) => {
  getRecipes(req.query.restaurant, res);
});
async function getRecipes(restaurantID, res) {
  try {
    const data = await queryRecipes(restaurantID);
    res.send(data);
  } catch (e) {
    // console.log('ERROR in getRecipes:', e);
  }
}
const queryRecipes = restaurantID =>
  db.where({ restaurant_id: restaurantID }).from('recipes');

// ADD NEW RECIPE
router.post('/create', (req, res) => {
  addRecipe(req.body, res);
});
async function addRecipe(recipe, res) {
  try {
    const data = await insertRecipe(recipe);
    res.send(data);
  } catch (e) {
    // console.log('ERROR in addRecipe:', e);
  }
}
const insertRecipe = recipe => db.insert(recipe).into('recipes');

// GET LIST OF INGREDIENTS FOR A GIVEN RECIPE ID
router.get('/ingredients', (req, res) => {
  getIngredients(req.query.recipe, res);
});

async function getIngredients(recipeID, res) {
  try {
    const data = await queryIngredients(recipeID);
    res.send(data);
  } catch (e) {
    // console.log('ERROR in getIngredients:', e);
  }
}
const queryIngredients = recipeID =>
  db('recipe_inventory')
    .join('inventory', 'recipe_inventory.ndbno', '=', 'inventory.ndbno')
    .where({ recipe_id: recipeID });

module.exports = router;

async function upsertPrice(data, res) {
  const recName = data.recipe_name;
  const recPrice = data.price;

  await db.raw(
    `INSERT INTO recipes (recipe_name, price) VALUES ('${recName}',${recPrice}) ON CONFLICT (recipe_name) DO UPDATE SET price = ${recPrice};`,
  );

  res.sendStatus(200);
}

router.post('/upsertPrice', (req, res) => {
  upsertPrice(req.body, res);
});

router.post('/upsertIngredients', (req, res) => {
  upsertIng(req.body, res);
});

/* eslint-disable */
async function upsertIng(ingObj, res) {
  try {
    if (ingObj.recId) {
      // delete ingredient in recipe
      
      await db('recipe_inventory').where({recipe_id: ingObj.recId}).del();
      return res.sendStatus(200);
    }
    // 1. delete items not in the db
    const { recipe_id } = ingObj[0];
    // get all ingredient list for recipe id
    const allIngredients = await db.raw(`SELECT * FROM recipe_inventory WHERE recipe_id = ${recipe_id}`);
    // get list of ndbnos to delete
    const ndbnos = ingObj.map(obj => obj.ndbno);
    const deleteThese = allIngredients.rows.filter(
      obj => !ndbnos.includes(obj.ndbno),
    );
    const deletendbnos = deleteThese.map(obj => obj.ndbno);
    // delete ndbnos no longer on recipe
    if (deletendbnos.length) {
      await db
        .from('recipe_inventory')
        .whereIn('ndbno', deletendbnos)
        .andWhere({ recipe_id })
        .del();
    }

    // 2. insert or upsert new ingredient info
    const queries = []; // Promise.all

    ingObj.forEach(obj => {
      queries.push(
        db('recipe_inventory')
          .where({
            recipe_id: obj.recipe_id,
            ndbno: obj.ndbno,
          })
          .then(exists => {
            if (exists.length) {
              // check recipe_id ndbno pair exists
              // update measurement
              return db('recipe_inventory')
                .where({
                  recipe_id: obj.recipe_id,
                  ndbno: obj.ndbno,
                })
                .update({ measurement: obj.measurement });
            }
            // insert
            return db
              .insert({
                recipe_id: obj.recipe_id,
                ndbno: obj.ndbno,
                measurement: obj.measurement,
              })
              .into('recipe_inventory');
          }),
      );
    });
    Promise.all(queries)
      .then(() => res.sendStatus(200))
      .catch(err => console.log(err));
    return
  } catch (e) {
    console.log(e);
  }
}
/* eslint-enable */
