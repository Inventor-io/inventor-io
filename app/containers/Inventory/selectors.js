import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the inventory state domain
 */

const selectInventoryDomain = state => state.get('inventory', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by Inventory
 */

const makeSelectInventory = () =>
  createSelector(selectInventoryDomain, substate => substate.currentInventory);

export { selectInventoryDomain, makeSelectInventory };
