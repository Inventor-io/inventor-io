import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the recipePage state domain
 */

const selectRecipePageDomain = state => state.get('recipePage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by RecipePage
 */

const makeSelectRecipePage = () =>
  createSelector(selectRecipePageDomain, substate => substate.toJS());

export default makeSelectRecipePage;
export { selectRecipePageDomain };
