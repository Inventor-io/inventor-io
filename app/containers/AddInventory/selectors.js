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

const makeSearchTermSelect = () =>
  createSelector(selectAddInventoryDomain, substate => substate.searchTerm);

const makeOptionsSelect = () =>
  createSelector(selectAddInventoryDomain, substate => substate.options); // .toJS());

const makeIngredientSelect = () =>
  createSelector(selectAddInventoryDomain, substate => substate.ingredient); // .toJS());

const makeAddIngredientSelect = () =>
  createSelector(
    selectAddInventoryDomain,
    substate => substate.addedIngredients,
  );

export {
  selectAddInventoryDomain,
  makeOptionsSelect,
  makeSearchTermSelect,
  makeIngredientSelect,
  makeAddIngredientSelect,
};
