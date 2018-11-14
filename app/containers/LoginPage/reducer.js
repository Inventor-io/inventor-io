/*
 *
 * LoginPage reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, LOGIN } from './constants';

export const initialState = fromJS({});

function loginPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOGIN:
      return state;
    default:
      return state;
  }
}

export default loginPageReducer;
