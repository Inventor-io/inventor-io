/*
 *
 * RestaurantList actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_RESTAURANTS,
  RECEIVED_RESTAURANTS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getRestaurants() {
  return {
    type: GET_RESTAURANTS,
  };
}

export function receivedRestaurants(restaurants) {
  return {
    type: RECEIVED_RESTAURANTS,
    restaurants,
  };
}
