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
  RESTAURANT_SUCCESFULLY_DELETED,
} from './constants';
// import history from '../../utils/history';

export const initialState = fromJS({});

function restaurantListReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case GET_RESTAURANTS:
      return state;
    case RECEIVED_RESTAURANTS:
      // console.log('INSIDE REDUCER', state);
      return Object.assign({}, state, { restaurants: action.restaurants });
    case RESTAURANT_SUCCESFULLY_DELETED:
      /* eslint-disable */

      const newState = Object.assign({}, state);
      const indexToDelete = newState.restaurants.findIndex(
        element => element.id === action.restaurantId,
      );
      /* eslint-enable */
      newState.restaurants.splice(indexToDelete, 1);
      // history.push('/restaurant');
      return newState;
    default:
      return state;
  }
}

export default restaurantListReducer;
