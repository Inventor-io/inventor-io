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

export const initialState = fromJS({});

function addInventoryReducer(state = initialState, action) {
  const newState = { ...state };
  switch (action.type) {
    case UPDATE_SEARCHTERM:
      newState.searchTerm = action.searchTerm;
      return newState;
    case UPDATE_DROPDOWN_OPTIONS:
      newState.options = action.data.data;
      return newState;
    case UPDATE_SELECT:
      // newState.ingredient = action.ingredient; // i
      // update addedIngredients state like -> addedIngredients: state.addedIngredients.concat([ingObj]),
      newState.addedIngredients = state.addedIngredients.concat([
        action.ingredient,
      ]);
      return newState;
    case SAVE_INV_TO_DB:
      // redirect to inventory page
      return newState;
    default:
      return state;
  }
}

export default addInventoryReducer;
