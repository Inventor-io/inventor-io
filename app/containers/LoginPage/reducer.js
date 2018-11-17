/*
 *
 * LoginPage reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SET_USERNAME, LOGOUT } from './constants';

export const initialState = fromJS({
  user: {},
});

function loginPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SET_USERNAME:
      return state.set('user', action.user);
    case LOGOUT:
      return state.set('user', {});
    default:
      return state;
  }
}

export default loginPageReducer;
