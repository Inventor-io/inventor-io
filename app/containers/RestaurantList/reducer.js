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
      return Object.assign({}, state, {
        restaurantList: action.restaurantList,
      });
    default:
      return state;
  }
}

export default restaurantListReducer;
