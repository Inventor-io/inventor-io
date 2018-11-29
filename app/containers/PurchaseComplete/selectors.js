import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the purchaseComplete state domain
 */

const selectPurchaseCompleteDomain = state =>
  state.get('purchaseComplete', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by PurchaseComplete
 */

const makeSelectPurchaseComplete = () =>
  createSelector(selectPurchaseCompleteDomain, substate => substate.toJS());

export default makeSelectPurchaseComplete;
export { selectPurchaseCompleteDomain };
