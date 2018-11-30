/*
 *
 * SalesPage actions
 *
 */

import { DEFAULT_ACTION, CHANGE_INPUT } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function handleInput() {
  return {
    type: CHANGE_INPUT,
  };
}
