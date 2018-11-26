/*
 *
 * Inventory reducer
 *
 */

import { fromJS } from 'immutable';
import { MOUNT_DB, ADD_ORDER } from './constants';

export const initialState = fromJS({ currentInventory: [], selected: [] });

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
    default:
      return state;
  }
}

export default inventoryReducer;
