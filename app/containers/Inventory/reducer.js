/*
 *
 * Inventory reducer
 *
 */

import { fromJS } from 'immutable';
import {
  MOUNT_DB,
  ADD_ORDER,
  DEL_INVEN,
  REPLACE_INVEN,
  FORMAT_ORDER,
  WIPE,
} from './constants';

export const initialState = fromJS({
  currentInventory: [],
  selected: [],
  delItem: '',
  formatted: [],
});

function inventoryReducer(state = initialState, action) {
  switch (action.type) {
    case MOUNT_DB:
      return Object.assign({}, state, {
        currentInventory: action.currentInventory,
      });
    case ADD_ORDER:
      return Object.assign({}, state, {
        selected: state.selected
          ? state.selected.concat([state.currentInventory[action.i].ndbno])
          : [state.currentInventory[action.i].ndbno],
      });
    case DEL_INVEN:
      return Object.assign({}, state, {
        delItem: action.delete,
      });
    case REPLACE_INVEN:
      return Object.assign({}, state, {
        currentInventory: action.currentInventory,
      });
    case FORMAT_ORDER:
      return Object.assign({}, state, {
        formatted: action.formatted,
      });
    case WIPE:
      return Object.assign({}, state, {
        currentInventory: [],
        selected: [],
        delItem: '',
        formatted: [],
      });
    default:
      return state;
  }
}

export default inventoryReducer;
