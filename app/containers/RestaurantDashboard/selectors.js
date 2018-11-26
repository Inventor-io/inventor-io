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
const makeSelectRestaurantId = () =>
  createSelector(selectRestaurantDashboardDomain, dashboard =>
    dashboard.get('id'),
  );

const makeSelectRestaurantInfo = () =>
  createSelector(selectRestaurantDashboardDomain, dashboard => dashboard.info);
/**
 * Default selector used by RestaurantDashboard
 */

const makeSelectRestaurantDashboard = () =>
  createSelector(selectRestaurantDashboardDomain, substate => substate);

export default makeSelectRestaurantDashboard;
export {
  selectRestaurantDashboardDomain,
  makeSelectRestaurantId,
  makeSelectRestaurantInfo,
};
