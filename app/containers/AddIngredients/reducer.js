/*
 *
 * AddIngredients reducer
 *
 */

import { fromJS } from 'immutable';
import {
  UPDATE_SEARCHTERM,
  UPDATE_DROPDOWN_OPTIONS,
  UPDATE_SELECT,
  REMOVE_ITEM,
  REPLACE_ITEM,
  REDIRECT,
  CLEAR_STATE,
} from './constants';

export const initialState = fromJS({
  options: [],
  addedIngredients: [],
  searchTerm: '',
  ingredient: [],
  remove: '',
});

function addIngredientsReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_STATE:
      return {};
    case UPDATE_SEARCHTERM:
      return Object.assign({}, state, { searchTerm: action.searchTerm });
    case UPDATE_DROPDOWN_OPTIONS:
      return Object.assign({}, state, { options: action.options });
    case UPDATE_SELECT:
      if (!state.addedIngredients) {
        return Object.assign({}, state, {
          addedIngredients: [state.options[action.ingredient]],
        });
      }
      if (
        state.addedIngredients.every(
          item => item.ndbno !== state.options[action.ingredient].ndbno,
        )
      ) {
        return Object.assign({}, state, {
          addedIngredients: state.addedIngredients.concat(
            state.options[action.ingredient],
          ),
        });
      }
      return state;

    // return Object.assign({}, state, {
    //   addedIngredients: state.addedIngredients
    //     ? state.addedIngredients.concat(state.options[action.ingredient])
    //     : [state.options[action.ingredient]],
    // });
    case REMOVE_ITEM:
      return Object.assign({}, state, {
        remove: action.name,
      });
    case REPLACE_ITEM:
      return Object.assign({}, state, {
        addedIngredients: action.addedIngredients,
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

export default addIngredientsReducer;
