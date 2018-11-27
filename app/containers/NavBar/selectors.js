import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the navBar state domain
 */

const selectNavBarDomain = state => state.get('navBar', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by NavBar
 */

const makeSelectNavBar = () =>
  createSelector(selectNavBarDomain, substate => substate.toJS());

export default makeSelectNavBar;
export { selectNavBarDomain };
