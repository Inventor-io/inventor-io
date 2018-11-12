import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the signupPage state domain
 */

const selectSignupPageDomain = state => state.get('signupPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by SignupPage
 */

const makeSelectSignupPage = () =>
  createSelector(selectSignupPageDomain, substate => substate.toJS());

export default makeSelectSignupPage;
export { selectSignupPageDomain };
