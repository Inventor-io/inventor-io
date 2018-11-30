/*
 *
 * AddRecipePage actions
 *
 */

import {
  UPDATE_NAME,
  UPDATE_PRICE,
  // UPDATE_DESCRIPTION,
  GET_INGREDIENTSLIST,
  SEND_FORM,
  UPDATE_ID,
  UPDATE_INGREDIENTSLIST,
  // DEFAULT_ACTION,
  DELETE_INGREDIENT,
  UPDATE_MODAL,
} from './constants';

// export function defaultAction() {
//   return {
//     type: DEFAULT_ACTION,
//   };
// }

export function updateModalState(modalState) {
  return {
    type: UPDATE_MODAL,
    modalState,
  };
}

export function updateId(recId) {
  return {
    type: UPDATE_ID,
    recId,
  };
}

export function updateName(recName) {
  return {
    type: UPDATE_NAME,
    recName,
  };
}

export function updatePrice(recPrice) {
  return {
    type: UPDATE_PRICE,
    recPrice,
  };
}

export function getIngredientsList() {
  return {
    type: GET_INGREDIENTSLIST,
  };
}

export function updateIngredientsList(recipeList) {
  return {
    type: UPDATE_INGREDIENTSLIST,
    ingredientsList: recipeList,
  };
}
/* eslint-disable */
export function deleteIngredient(recipe_id, ndbno) {
  return {
    type: DELETE_INGREDIENT,
    payload: { recipe_id, ndbno },
  };
}
/* eslint-enable */

// export function updateDescription(recDescription) {
//   return {
//     type: UPDATE_DESCRIPTION,
//     recDescription,
//   };
// }

export function sendForm() {
  // const data = { resAddress, resName, resNumber };
  return {
    type: SEND_FORM,
  };
}
