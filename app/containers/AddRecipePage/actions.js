/*
 *
 * AddRecipePage actions
 *
 */

import {
  UPDATE_NAME,
  UPDATE_PRICE,
  // UPDATE_DESCRIPTION,
  SEND_FORM,
} from './constants';

export function updateName(recName) {
  return {
    type: UPDATE_NAME,
    recName,
  };
}

export function updatePrice(recPrice) {
  return {
    type: UPDATE_PRICE,
    recPrice,
  };
}

// export function updateDescription(recDescription) {
//   return {
//     type: UPDATE_DESCRIPTION,
//     recDescription,
//   };
// }

export function sendForm() {
  // const data = { resAddress, resName, resNumber };
  return {
    type: SEND_FORM,
  };
}
