/*
 *
 * PurchaseComplete reducer
 *
 */

import { fromJS } from 'immutable';
import { PASS_ORDERLIST } from './constants';

export const initialState = fromJS({
  orderList: [],
});

function purchaseCompleteReducer(state = initialState, action) {
  switch (action.type) {
    case PASS_ORDERLIST:
      return Object.assign({}, state, {
        orderList: action.orderList,
      });
    default:
      return state;
  }
}

export default purchaseCompleteReducer;
