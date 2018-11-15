import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the restaurantList state domain
 */

const selectRestaurantListDomain = state =>
  state.get('restaurantList', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by RestaurantList
 */

const makeSelectRestaurantList = () =>
  createSelector(selectRestaurantListDomain, substate => substate.toJS());

export default makeSelectRestaurantList;
export { selectRestaurantListDomain };
