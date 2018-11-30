/*
 *
 * PurchaseComplete actions
 *
 */

import { FETCH_ORDERLIST, PASS_ORDERLIST } from './constants';

export function fetchOrders() {
  return {
    type: FETCH_ORDERLIST,
  };
}

export function passOrders(arr) {
  return {
    type: PASS_ORDERLIST,
    orderList: arr,
  };
}
