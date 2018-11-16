/*
 *
 * LoginPage actions
 *
 */

import { DEFAULT_ACTION, SET_USERNAME } from './constants';

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
