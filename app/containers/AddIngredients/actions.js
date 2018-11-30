/*
 *
 * AddIngredients actions
 *
 */

import {
  UPDATE_SEARCHTERM,
  UPDATE_DROPDOWN_OPTIONS,
  UPDATE_SELECT,
  SAVE_INV_TO_DB,
  SEND_QUERY,
  REMOVE_ITEM,
  REPLACE_ITEM,
  REDIRECT,
  CLEAR_STATE,
} from './constants';

export function clearState() {
  return {
    type: CLEAR_STATE,
  };
}

export function updateSearchTerm(searchTerm) {
  return {
    type: UPDATE_SEARCHTERM,
    searchTerm,
  };
}

export function sendQuery() {
  // send axios request to usda
  return {
    type: SEND_QUERY,
  };
}

export function updateDropdownOption(data) {
  return {
    type: UPDATE_DROPDOWN_OPTIONS,
    options: data,
  };
}

export function updateSelect(ingredient) {
  return {
    type: UPDATE_SELECT,
    ingredient,
  };
}

export function saveToDB() {
  return {
    type: SAVE_INV_TO_DB,
  };
}

export function removeItem(name) {
  return {
    type: REMOVE_ITEM,
    name,
  };
}

export function replaceAddedIng(arr) {
  return {
    type: REPLACE_ITEM,
    addedIngredients: arr,
  };
}

export function redirect() {
  return {
    type: REDIRECT,
  };
}
