import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the restaurantDashboard state domain
 */

const selectRestaurantDashboardDomain = state =>
  state.get('restaurantDashboard', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by RestaurantDashboard
 */

const makeSelectRestaurantDashboard = () =>
  createSelector(selectRestaurantDashboardDomain, substate => substate.toJS());

export default makeSelectRestaurantDashboard;
export { selectRestaurantDashboardDomain };
