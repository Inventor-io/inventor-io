/*
 *
 * AddInventory actions
 *
 */

import {
  UPDATE_SEARCHTERM,
  UPDATE_DROPDOWN_OPTIONS,
  UPDATE_SELECT,
  SAVE_INV_TO_DB,
} from './constants';

export function updateSearchTerm(searchTerm) {
  return {
    type: UPDATE_SEARCHTERM,
    searchTerm,
  };
}

export function updateDropdownOptions(searchTerm) {
  console.log('>>> searchterm', searchTerm);
  return {
    type: UPDATE_DROPDOWN_OPTIONS,
    // usda search term request
  };
}

export function updateSelect(ingredient) {
  return {
    type: UPDATE_SELECT,
    ingredient,
  };
}

export function saveToDB(addedIngredients) {
  console.log('>>> addedIngredients', addedIngredients);
  return {
    type: SAVE_INV_TO_DB,
    // save to db
  };
}
