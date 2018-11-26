/*
 *
 * RecipePage actions
 *
 */

import { GET_RECIPES, UPDATE_RECIPELIST } from './constants';

export function getRecipes() {
  return {
    type: GET_RECIPES,
  };
}

export function updateRecipeList(recipeList) {
  return {
    type: UPDATE_RECIPELIST,
    recipeList,
  };
}
