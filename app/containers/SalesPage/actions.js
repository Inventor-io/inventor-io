/*
 *
 * SalesPage actions
 *
 */

import { DEFAULT_ACTION, CHANGE_INPUT, UPDATE_SALES_LIST } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function handleInput(key, target) {
  return {
    type: CHANGE_INPUT,
    modify: key,
    value: target,
  };
}

export function updateSalesList(array) {
  return {
    type: UPDATE_SALES_LIST,
    list: array,
  };
}
