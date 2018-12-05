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
  DEL_FROM_ORDER_LIST,
} from './constants';

export const initialState = fromJS({
  currentInventory: [], // list to render
  selected: [], // selected ndbnos
  delItem: '', // item to delete
  formatted: [], // arr to pass to next page
});

function inventoryReducer(state = initialState, action) {
  switch (action.type) {
    case MOUNT_DB:
      return Object.assign({}, state, {
        currentInventory: action.currentInventory,
      });
    case ADD_ORDER:
    /* eslint-disable */
      return Object.assign({}, state, {
        selected: state.selected
          ? (action.checked ? state.selected.concat([state.currentInventory[action.i].ndbno]) : state.selected.filter(ndbno => ndbno !== state.currentInventory[action.i].ndbno))
          : (action.checked ? [state.currentInventory[action.i].ndbno] : []),
      });
    /* eslint-enable */
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
    case DEL_FROM_ORDER_LIST:
      return Object.assign({}, state, {
        formatted: action.orderList,
      });
    default:
      return state;
  }
}

export default inventoryReducer;
