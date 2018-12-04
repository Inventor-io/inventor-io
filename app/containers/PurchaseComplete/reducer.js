/*
 *
 * PurchaseComplete reducer
 *
 */

import { fromJS } from 'immutable';
import {
  PASS_ORDERLIST,
  MAKE_IT_ARRIVE,
  // TELL_EM_IT_ARRIVED,
} from './constants';

export const initialState = fromJS({
  orderList: [],
  i: 0,
});

function purchaseCompleteReducer(state = initialState, action) {
  switch (action.type) {
    case PASS_ORDERLIST:
      return Object.assign({}, state, {
        orderList: action.orderList,
      });
    case MAKE_IT_ARRIVE:
      return Object.assign({}, state, {
        orderList: state.orderList.map((obj, i) => {
          const nobj = { ...obj };
          if (i === action.i) {
            nobj.Delivered = true;
          }
          return nobj;
        }),
        i: action.i,
      });
    // case TELL_EM_IT_ARRIVED:
    //   return Object.assign({}, state, {
    //     orderList: state.orderList.map((obj, i) => {
    //       const nobj = { ...obj };
    //       if (i === action.i) {
    //         nobj.quantity = obj.quantity + action.quantity;
    //       }
    //       return nobj;
    //     }),
    //   });
    default:
      return state;
  }
}

export default purchaseCompleteReducer;
