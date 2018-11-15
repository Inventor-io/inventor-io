import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the addRecipePage state domain
 */

const selectAddRecipePageDomain = state =>
  state.get('addRecipePage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddRecipePage
 */

const makeSelectAddRecipePage = () =>
  createSelector(selectAddRecipePageDomain, substate => substate.toJS());

export default makeSelectAddRecipePage;
export { selectAddRecipePageDomain };
