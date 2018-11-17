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
const makeSelectRestaurantID = () =>
  createSelector(selectRestaurantDashboardDomain, dashboard =>
    dashboard.get('id'),
  );
/**
 * Default selector used by RestaurantDashboard
 */

const makeSelectRestaurantDashboard = () =>
  createSelector(selectRestaurantDashboardDomain, substate => substate);

export default makeSelectRestaurantDashboard;
export { selectRestaurantDashboardDomain, makeSelectRestaurantID };
