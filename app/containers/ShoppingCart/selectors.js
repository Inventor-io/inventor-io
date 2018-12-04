import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the shoppingCart state domain
 */

const selectShoppingCartDomain = state =>
  state.get('shoppingCart', initialState);

const makeSelectOrderList = () =>
  createSelector(selectShoppingCartDomain, substate => substate.orderList);

export { selectShoppingCartDomain, makeSelectOrderList };
