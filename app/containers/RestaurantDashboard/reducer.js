/*
 *
 * RestaurantDashboard reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SELECT_RESTAURANT, LOAD_INFO } from './constants';

export const initialState = fromJS({});

function restaurantDashboardReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SELECT_RESTAURANT:
      return Object.assign({}, state, {
        selectedRestaurant: action.id,
      });
    case LOAD_INFO:
      return state;
    default:
      return state;
  }
}

export default restaurantDashboardReducer;
