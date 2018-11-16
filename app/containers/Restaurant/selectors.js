import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the restaurant state domain
 */

const selectRestaurantDomain = state => state.get('restaurant', initialState);
// state.restaurant; //
/**
 * Other specific selectors
 */

/**
 * Default selector used by Restaurant
 */

const selectRestaurant = () => {
  createSelector(selectRestaurantDomain, state => state.get(''));
};

const makeSelectResName = () =>
  createSelector(selectRestaurantDomain, addressState =>
    addressState.get('resName'),
  );

const makeSelectResAddress = () =>
  createSelector(selectRestaurantDomain, addressState =>
    addressState.get('resAddress'),
  );
const makeSelectResNumber = () =>
  createSelector(selectRestaurantDomain, addressState =>
    addressState.get('resNumber'),
  );

const makeSelectResWebsite = () =>
  createSelector(selectRestaurantDomain, addressState =>
    addressState.get('resWebsite'),
  );

// export default makeSelectRestaurant;
export {
  selectRestaurantDomain,
  makeSelectResAddress,
  makeSelectResName,
  makeSelectResNumber,
  selectRestaurant,
  makeSelectResWebsite,
};
