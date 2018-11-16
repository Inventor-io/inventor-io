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
const makeSelectRecName = () =>
  createSelector(selectAddRecipePageDomain, addressState =>
    addressState.get('recName'),
  );

const makeSelectRecDescription = () =>
  createSelector(selectAddRecipePageDomain, addressState =>
    addressState.get('recDescription'),
  );

const selectAddRecipe = () => {
  createSelector(selectAddRecipe, state => state.get(''));
};
/**
 * Default selector used by AddRecipePage
 */

// const makeSelectAddRecipePage = () =>
//   createSelector(selectAddRecipePageDomain, substate => substate.toJS());

// export default makeSelectAddRecipePage;
export {
  selectAddRecipePageDomain,
  selectAddRecipe, // mjw - Not sure what this one does.
  makeSelectRecName,
  makeSelectRecDescription,
};
