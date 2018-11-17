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
      return Object.assign({}, state, {
        addedIngredients: state.addedIngredients
          ? state.addedIngredients.concat(state.options[action.ingredient])
          : [state.options[action.ingredient]],
      });
    default:
      return state;
  }
}

export default addInventoryReducer;
