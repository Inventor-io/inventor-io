import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the salesPage state domain
 */

const selectSalesPageDomain = state => state.get('salesPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by SalesPage
 */

const makeSelectSalesPage = () =>
  createSelector(selectSalesPageDomain, substate => substate.toJS());

export default makeSelectSalesPage;
export { selectSalesPageDomain };
