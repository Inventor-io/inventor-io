import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the loginPage state domain
 */

const selectLoginPageDomain = state => state.get('loginPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by LoginPage
 */

const makeSelectLoginPage = () =>
  createSelector(selectLoginPageDomain, substate => {
    console.log('this is the selector', substate.get('user'));
    return substate.get('user');
  });

export default makeSelectLoginPage;
export { selectLoginPageDomain };
