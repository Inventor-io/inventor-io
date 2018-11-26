/*
 *
 * RecipePage reducer
 *
 */

import { fromJS } from 'immutable';
import { GET_RECIPES, UPDATE_RECIPELIST } from './constants';

export const initialState = fromJS({});

function recipePageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES:
      return state;
    case UPDATE_RECIPELIST:
      return Object.assign({}, state, {
        recipeList: action.recipeList,
      });
    default:
      return state;
  }
}

export default recipePageReducer;
