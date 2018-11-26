/*
 *
 * LandingPage reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, NAVIGATE, SET_USERNAME } from './constants';

export const initialState = fromJS({
  user: {},
});

function landingPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case NAVIGATE:
      return state;
    case SET_USERNAME:
      return state.set('user', action.user);
    default:
      return state;
  }
}

export default landingPageReducer;
