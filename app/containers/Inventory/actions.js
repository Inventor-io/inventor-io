/*
 *
 * Inventory actions
 *
 */

import { GET_DB, MOUNT_DB } from './constants';

export function getInventory() {
  return {
    type: GET_DB,
  };
}

export function mountDB(currentInventory) {
  return {
    type: MOUNT_DB,
    currentInventory,
  };
}
