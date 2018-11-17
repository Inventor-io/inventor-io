/*
 *
 * LoginPage actions
 *
 */

import { DEFAULT_ACTION, SET_USERNAME, LOGOUT } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setUsername(user) {
  return {
    type: SET_USERNAME,
    user,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}
