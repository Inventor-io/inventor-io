/*
 *
 * ShoppingCart reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DELETE_ITEM,
  WIPE_CART,
  SEND_MOUNT_ORDER,
  CHANGE_INPUT,
} from './constants';

export const initialState = fromJS({
  orderList: [], // order list to display
});

function shoppingCartReducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_ITEM:
      return Object.assign({}, state, {
        orderList: []
          .concat(state.orderList.slice(0, action.del))
          .concat(state.orderList.slice(action.del + 1)),
      });
    case WIPE_CART:
      return Object.assign({}, state, {
        orderList: [],
      });
    case SEND_MOUNT_ORDER:
      return Object.assign({}, state, {
        orderList: action.orderList,
      });
    case CHANGE_INPUT:
      return Object.assign({}, state, {
        orderList: state.orderList.map((obj, i) => {
          const nobj = { ...obj };
          if (i === parseInt(action.modify, 10)) {
            nobj.Price = action.value;
          }
          return nobj;
        }),
      });
    default:
      return state;
  }
}

export default shoppingCartReducer;
