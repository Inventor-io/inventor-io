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
  createSelector(selectAddRecipePageDomain, substate =>
    substate.get('recName'),
  );
const makeSelectRecPrice = () =>
  createSelector(selectAddRecipePageDomain, substate =>
    substate.get('recPrice'),
  );
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
  makeSelectRecName,
  makeSelectRecPrice,
  // makeSelectRecDescription,
};
