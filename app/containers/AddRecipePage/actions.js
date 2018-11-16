/*
 *
 * AddRecipePage actions
 *
 */

import { UPDATE_NAME, UPDATE_DESCRIPTION } from './constants';

export function updateDescription(recDescription) {
  return {
    type: UPDATE_DESCRIPTION,
    recDescription,
  };
}

export function updateName(recName) {
  return {
    type: UPDATE_NAME,
    recName,
  };
}
