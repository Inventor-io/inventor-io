/*
 *
 * PurchaseComplete actions
 *
 */

import {
  FETCH_ORDERLIST,
  PASS_ORDERLIST,
  MAKE_IT_ARRIVE,
  // TELL_EM_IT_ARRIVED,
} from './constants';

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

export function itArrived(i) {
  return {
    type: MAKE_IT_ARRIVE,
    i,
  };
}

// export function tellemItArrived(table) {
//   return {
//     type: TELL_EM_IT_ARRIVED,
//     table,
//   };
// }
