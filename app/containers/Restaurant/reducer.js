/*
 *
 * Restaurant reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SEND_FORM,
  UPDATE_ADDRESS,
  UPDATE_NAME,
  UPDATE_NUMBER,
} from './constants';

export const initialState = fromJS({});

function restaurantReducer(state = initialState, action) {
  switch (action.type) {
    case SEND_FORM:
      return state;
    case UPDATE_ADDRESS:
      return Object.assign({}, state, {
        resAddress: action.resAddress,
      });
    case UPDATE_NAME:
      return Object.assign({}, state, {
        resName: action.resName,
      });
    case UPDATE_NUMBER:
      return Object.assign({}, state, {
        resNumber: action.resNumber,
      });
    default:
      return state;
  }
}

export default restaurantReducer;
