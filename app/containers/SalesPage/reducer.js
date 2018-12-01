/*
 *
 * SalesPage reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, CHANGE_INPUT, UPDATE_SALES_LIST } from './constants';

export const initialState = fromJS({
  salesList: [],
});

function salesPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case CHANGE_INPUT:
      return Object.assign({}, state, {
        salesList: state.salesList.map(obj => {
          const nobj = { ...obj };
          if (nobj.recipe_id === action.modify) {
            nobj.quantity = action.value;
          }
          return nobj;
        }),
      });
    case UPDATE_SALES_LIST:
      return Object.assign({}, state, {
        salesList: action.list.recipes.map(obj =>
          Object.assign({}, obj, { quantity: '' }),
        ),
      });
    default:
      return state;
  }
}

export default salesPageReducer;
