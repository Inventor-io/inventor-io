/*
 *
 * LandingPage reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, NAVIGATE } from './constants';

export const initialState = fromJS({});

function landingPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case NAVIGATE:
      return state;
    default:
      return state;
  }
}

export default landingPageReducer;
