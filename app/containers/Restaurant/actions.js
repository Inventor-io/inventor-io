/*
 *
 * Restaurant actions
 *
 */

import {
  UPDATE_ADDRESS,
  UPDATE_NAME,
  UPDATE_NUMBER,
  UPDATE_WEBSITE,
  SEND_FORM,
} from './constants';
import { DEFAULT_ACTION } from '../LoginPage/constants';

export function sendForm() {
  // const data = { resAddress, resName, resNumber };

  return {
    type: SEND_FORM,
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

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function updateWebsite(resWebsite) {
  return {
    type: UPDATE_WEBSITE,
    resWebsite,
  };
}
