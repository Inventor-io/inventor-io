/*
 *
 * LoginPage reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SET_USERNAME } from './constants';

export const initialState = fromJS({
  user: {},
});

function loginPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SET_USERNAME:
      return state.set('user', action.user);
    default:
      return state;
  }
}

export default loginPageReducer;
