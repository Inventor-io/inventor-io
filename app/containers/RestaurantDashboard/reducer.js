/*
 *
 * RestaurantDashboard reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, SELECT_RESTAURANT } from './constants';

export const initialState = fromJS({});

function restaurantDashboardReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SELECT_RESTAURANT:
      return Object.assign({}, state, {
        selectedRestaurant: action.id,
      });
    default:
      return state;
  }
}

export default restaurantDashboardReducer;
