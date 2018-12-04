/*
 *
 * RecipePage actions
 *
 */

import { GET_RECIPES, UPDATE_RECIPELIST, DELETE_RECIPE } from './constants';

export function getRecipes() {
  return {
    type: GET_RECIPES,
  };
}

export function deleteRecipe(recipeID) {
  return {
    type: DELETE_RECIPE,
    payload: { recipe_id: recipeID },
  };
}

export function updateRecipeList(recipeList) {
  return {
    type: UPDATE_RECIPELIST,
    recipeList,
  };
}
