/*
 *
 * AddRecipePage reducer
 *
 */

import { fromJS } from 'immutable';
import { UPDATE_NAME, UPDATE_DESCRIPTION } from './constants';

export const initialState = fromJS({});

function addRecipePageReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_NAME:
      return Object.assign({}, state, {
        recName: action.recName,
      });
    case UPDATE_DESCRIPTION:
      return Object.assign({}, state, {
        recDescription: action.recDescription,
      });
    default:
      return state;
  }
}

export default addRecipePageReducer;
