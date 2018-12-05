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
  DEL_INVEN,
  REPLACE_INVEN,
  FORMAT_ORDER,
  WIPE,
  DEL_FROM_ORDER_LIST,
} from './constants';

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
    checked: i.checked,
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

export function formattedOrder(arr) {
  return {
    type: FORMAT_ORDER,
    formatted: arr,
  };
}

export function wipeChecked() {
  return {
    type: WIPE,
  };
}

export function delFromOrderList(orderList) {
  return {
    type: DEL_FROM_ORDER_LIST,
    orderList,
  };
}
