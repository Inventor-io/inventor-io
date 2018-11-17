/*
 *
 * AddInventory reducer
 *
 */

import { fromJS } from 'immutable';
import {
  UPDATE_SEARCHTERM,
  UPDATE_DROPDOWN_OPTIONS,
  UPDATE_SELECT,
  SAVE_INV_TO_DB,
} from './constants';

export const initialState = fromJS({
  options: [],
  addedIngredients: [],
  searchTerm: '',
  ingredient: [],
});

function addInventoryReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SEARCHTERM:
      return Object.assign({}, state, { searchTerm: action.searchTerm });
    case UPDATE_DROPDOWN_OPTIONS:
      return Object.assign({}, state, { options: action.options });
    case UPDATE_SELECT:
      return Object.assign({}, state, { ingredient: action.ingredient });
    case SAVE_INV_TO_DB:
      return state;
    default:
      return state;
  }
}

export default addInventoryReducer;
