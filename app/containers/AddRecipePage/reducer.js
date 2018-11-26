/*
 *
 * AddRecipePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  UPDATE_ID,
  UPDATE_NAME,
  UPDATE_PRICE,
  // UPDATE_DESCRIPTION,
  SEND_FORM,
  UPDATE_INGREDIENTSLIST,
} from './constants';

export const initialState = fromJS({});

function addRecipePageReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_ID:
      return Object.assign({}, state, {
        recId: action.recId,
      });
    case UPDATE_NAME:
      return Object.assign({}, state, {
        recName: action.recName,
      });
    case UPDATE_PRICE:
      return Object.assign({}, state, {
        recPrice: action.recPrice,
      });
    case UPDATE_INGREDIENTSLIST:
      return Object.assign({}, state, {
        ingredientsList: action.ingredientsList,
      });
    // case UPDATE_DESCRIPTION:
    //   return Object.assign({}, state, {
    //     recDescription: action.recDescription,
    //   });
    case SEND_FORM:
      return state;
    default:
      return state;
  }
}

export default addRecipePageReducer;
