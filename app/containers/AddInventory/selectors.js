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

const makeOptionsSelect = () =>
  createSelector(selectAddInventoryDomain, substate => substate.get('options')); // .toJS());

const makeSearchTermSelect = () =>
  createSelector(selectAddInventoryDomain, substate =>
    substate.get('searchTerm'),
  ); // .toJS());

const makeIngredientSelect = () =>
  createSelector(selectAddInventoryDomain, substate =>
    substate.get('ingredient'),
  ); // .toJS());

const makeAddIngredientSelect = () =>
  createSelector(selectAddInventoryDomain, substate =>
    substate.get('addedIngredients'),
  );

export {
  selectAddInventoryDomain,
  makeOptionsSelect,
  makeSearchTermSelect,
  makeIngredientSelect,
  makeAddIngredientSelect,
};
