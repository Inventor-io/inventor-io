/*
 *
 * ShoppingCart actions
 *
 */

import {
  DELETE_ITEM,
  PLACE_ORDER,
  CHANGE_INPUT,
  CALL_MOUNT_ORDER,
  SEND_MOUNT_ORDER,
  WIPE_CART,
} from './constants';

export function deleteItem(i) {
  return {
    type: DELETE_ITEM,
    del: i,
  };
}

export function placeOrder() {
  return {
    type: PLACE_ORDER,
  };
}

export function handleInput(i, val) {
  return {
    type: CHANGE_INPUT,
    modify: i,
    value: parseInt(val, 10),
  };
}

export function mountOrder() {
  return {
    type: CALL_MOUNT_ORDER,
  };
}

export function sendMountOrder(arr) {
  return {
    type: SEND_MOUNT_ORDER,
    orderList: arr,
  };
}

export function wipeCart() {
  return {
    type: WIPE_CART,
  };
}
