/*
 *
 * Inventory reducer
 *
 */

import { fromJS } from 'immutable';
import { MOUNT_DB } from './constants';

export const initialState = fromJS({ currentInventory: [] });

function inventoryReducer(state = initialState, action) {
  switch (action.type) {
    case MOUNT_DB:
      return Object.assign({}, state, {
        currentInventory: action.currentInventory,
      });
    default:
      return state;
  }
}

export default inventoryReducer;
