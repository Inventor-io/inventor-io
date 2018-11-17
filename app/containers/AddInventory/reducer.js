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
      return newState;
    case UPDATE_DROPDOWN_OPTIONS:
      return newState;
    case UPDATE_SELECT:
      return state;
    case SAVE_INV_TO_DB:
      return newState;
    default:
      return newState;
  }
}

export default addInventoryReducer;
