/*
 *
 * Inventory actions
 *
 */

import { GET_DB, MOUNT_DB, ADD_ORDER, ORDER } from './constants';

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

export function addToOrder(i) {
  return {
    type: ADD_ORDER,
    i: i.value,
  };
}

export function order() {
  return {
    type: ORDER,
  };
}
