/*
 *
 * RestaurantList actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_RESTAURANTS,
  RECEIVED_RESTAURANTS,
  DELETE_RESTAURANT,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function deleteRestaurant(restaurantId) {
  return {
    type: DELETE_RESTAURANT,
    restaurantId,
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
