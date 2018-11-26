/*
 *
 * LandingPage actions
 *
 */

import { DEFAULT_ACTION, NAVIGATE, SET_USERNAME } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function navigateAction(location) {
  return {
    type: NAVIGATE,
    location,
  };
}

export function setUsername(user) {
  return {
    type: SET_USERNAME,
    user,
  };
}
