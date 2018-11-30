import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the addIngredients state domain
 */

const selectAddIngredientsDomain = state =>
  state.get('addIngredients', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddIngredients
 */

const makeSearchTermSelect = () =>
  createSelector(selectAddIngredientsDomain, substate => substate.searchTerm);

const makeOptionsSelect = () =>
  createSelector(selectAddIngredientsDomain, substate => substate.options); // .toJS());

const makeIngredientSelect = () =>
  createSelector(selectAddIngredientsDomain, substate => substate.ingredient); // .toJS());

const makeAddIngredientSelect = () =>
  createSelector(
    selectAddIngredientsDomain,
    substate => substate.addedIngredients,
  );

export {
  selectAddIngredientsDomain,
  makeOptionsSelect,
  makeSearchTermSelect,
  makeIngredientSelect,
  makeAddIngredientSelect,
};
