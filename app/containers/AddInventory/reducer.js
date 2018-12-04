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
  REMOVE_ITEM,
  REDIRECT,
} from './constants';

export const initialState = fromJS({
  options: [], // dropdown options
  addedIngredients: [], // list to send to purchase page
  searchTerm: '', // query to send to usda
  ingredient: [], // ?
  remove: '', // dont need...?
});

function addInventoryReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SEARCHTERM: // update searchTerm string
      return Object.assign({}, state, { searchTerm: action.searchTerm });
    case UPDATE_DROPDOWN_OPTIONS: // update dropdown options
      return Object.assign({}, state, { options: action.options });
    case UPDATE_SELECT: // select from dropdown and add to addedIngredients
      return Object.assign({}, state, {
        addedIngredients: state.addedIngredients
          ? state.addedIngredients.concat(state.options[action.ingredient])
          : [state.options[action.ingredient]],
      });
    case REMOVE_ITEM:
      return Object.assign({}, state, {
        addedIngredients: []
          .concat(state.addedIngredients.slice(0, action.i))
          .concat(state.addedIngredients.slice(action.i + 1)),
      });
    case REDIRECT:
      return Object.assign({}, state, {
        options: [],
        addedIngredients: [],
        searchTerm: '',
        ingredient: [],
        remove: '',
      });
    default:
      return state;
  }
}

export default addInventoryReducer;
