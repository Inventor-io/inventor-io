/*
 *
 * Restaurant actions
 *
 */

import {
  DEFAULT_ACTION,
  UPDATE_ADDRESS,
  UPDATE_NAME,
  UPDATE_NUMBER,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function updateAddress(resAddress) {
  return {
    type: UPDATE_ADDRESS,
    resAddress,
  };
}

export function updateName(resName) {
  return {
    type: UPDATE_NAME,
    resName,
  };
}

export function updateNumber(resNumber) {
  return {
    type: UPDATE_NUMBER,
    resNumber,
  };
}
