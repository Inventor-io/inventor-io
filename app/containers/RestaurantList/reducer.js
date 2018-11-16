/*
 *
 * RestaurantList reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  GET_RESTAURANTS,
  RECEIVED_RESTAURANTS,
} from './constants';

export const initialState = fromJS({});

function restaurantListReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case GET_RESTAURANTS:
      return state;
    case RECEIVED_RESTAURANTS:
      console.log('INSIDE REDUCER', state);
      return Object.assign({}, state, { restaurants: action.restaurants });
    default:
      return state;
  }
}

export default restaurantListReducer;
