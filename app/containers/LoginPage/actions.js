/*
 *
 * LoginPage actions
 *
 */

import { DEFAULT_ACTION, LOGIN } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function login() {
  return {
    type: LOGIN,
  };
}
