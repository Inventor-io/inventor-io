/*
 *
 * RestaurantDashboard actions
 *
 */

import { DEFAULT_ACTION, SELECT_RESTAURANT } from './constants';

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
