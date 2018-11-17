/*
 *
 * RestaurantDashboard actions
 *
 */

import { DEFAULT_ACTION, SELECT_RESTAURANT, LOAD_INFO } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function selectedRes(id) {
  return {
    type: SELECT_RESTAURANT,
    id,
  };
}

export function loadInformation() {
  return {
    type: LOAD_INFO,
  };
}
