/*
 *
 * Restaurant actions
 *
 */

import {
  UPDATE_ADDRESS,
  UPDATE_NAME,
  UPDATE_NUMBER,
  SEND_FORM,
  UPDATE_PHOTO,
} from './constants';

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

export function updatePhoto(photo) {
  return {
    type: UPDATE_PHOTO,
    photo,
  };
}
