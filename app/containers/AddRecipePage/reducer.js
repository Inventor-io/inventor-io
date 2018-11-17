/*
 *
 * AddRecipePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  UPDATE_NAME,
  UPDATE_PRICE,
  // UPDATE_DESCRIPTION,
  SEND_FORM,
} from './constants';

export const initialState = fromJS({});

function addRecipePageReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_NAME:
      return Object.assign({}, state, {
        recName: action.recName,
      });
    case UPDATE_PRICE:
      return Object.assign({}, state, {
        recPrice: action.recPrice,
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
