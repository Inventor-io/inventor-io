/*
 *
 * Inventory actions
 *
 */

import {
  GET_DB,
  MOUNT_DB,
  ADD_ORDER,
  ORDER,
  DEFAULT_ACTION,
  DEL_INVEN,
  REPLACE_INVEN,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

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

export function delInven(ndbno) {
  return {
    type: DEL_INVEN,
    delete: ndbno,
  };
}

export function replaceInven(arr) {
  return {
    type: REPLACE_INVEN,
    currentInventory: arr,
  };
}
