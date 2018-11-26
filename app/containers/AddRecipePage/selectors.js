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
  createSelector(selectAddRecipePageDomain, state => state.recName);
const makeSelectRecPrice = () =>
  createSelector(selectAddRecipePageDomain, state => state.recPrice);
const makeSelectRecId = () =>
  createSelector(selectAddRecipePageDomain, state => state.recId);
const makeSelectIngredientsList = () =>
  createSelector(selectAddRecipePageDomain, state => state);
// const makeSelectRecDescription = () =>
//   createSelector(selectAddRecipePageDomain, substate =>
//     substate.get('recDescription'),
//   );

const selectAddRecipe = () => {
  createSelector(selectAddRecipe, substate => substate.get(''));
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
  makeSelectRecId,
  makeSelectRecName,
  makeSelectRecPrice,
  makeSelectIngredientsList,
  // makeSelectRecDescription,
};
