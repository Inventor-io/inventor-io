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
  UPDATE_MODAL,
  UPDATE_INGREDIENT_AMOUNT,
} from './constants';

export const initialState = fromJS({});

function addRecipePageReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_MODAL:
      return Object.assign({}, state, {
        modalState: action.modalState,
      });
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
        recPrice: parseFloat(action.recPrice),
      });
    case UPDATE_INGREDIENTSLIST:
      return Object.assign({}, state, {
        ingredientsList: action.ingredientsList,
      });
    // case UPDATE_DESCRIPTION:
    //   return Object.assign({}, state, {
    //     recDescription: action.recDescription,
    //   });
    case UPDATE_INGREDIENT_AMOUNT:
      return Object.assign({}, state, {
        ingredientsList: state.ingredientsList.map(obj => {
          const nObj = { ...obj };
          if (obj.ndbno === action.payload.ndbno) {
            nObj.measurement = action.payload.measurement;
          }
          return nObj;
        }),
      });
    case SEND_FORM:
      return state;
    default:
      return state;
  }
}

export default addRecipePageReducer;
