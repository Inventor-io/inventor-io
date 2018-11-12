import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the addInventory state domain
 */

const selectAddInventoryDomain = state =>
  state.get('addInventory', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddInventory
 */

const makeSelectAddInventory = () =>
  createSelector(selectAddInventoryDomain, substate => substate.toJS());

export default makeSelectAddInventory;
export { selectAddInventoryDomain };
