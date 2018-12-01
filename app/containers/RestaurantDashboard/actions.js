/*
 *
 * RestaurantDashboard actions
 *
 */

import {
  DEFAULT_ACTION,
  SELECT_RESTAURANT,
  LOAD_INFO,
  RECEIVED_RESTAURANT_INFO,
  RESTAURANT_COSTS,
} from './constants';
/* eslint-disable */
import { RECEIVED_RESTAURANTS } from '../RestaurantList/constants';
/* eslint-enable */
export function restaurantCosts(resCosts) {
  return {
    type: RESTAURANT_COSTS,
    resCosts,
  };
}

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

export function receivedRestaurantInfo(info) {
  return {
    type: RECEIVED_RESTAURANT_INFO,
    info,
  };
}
