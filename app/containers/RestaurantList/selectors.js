import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the restaurantList state domain
 */

const selectRestaurantListDomain = state =>
  state.get('restaurantList', initialState);

// const makeSelectRestaurantList = () => {
//   createSelector(selectRestaurantListDomain, state => state.get(''));
// };
/**
 * Other specific selectors
 *
 */

// const makeSelectResaurantList = () =>
// createSelector(selectRestaurantListDomain, RestaurantList =>
//   RestaurantList.get('resName'),
// );

/**
 * Default selector used by RestaurantList
 */

// const makeSelectRestaurantList = () =>
//   createSelector(selectRestaurantListDomain, substate => substate.toJS());

const makeSelectRestaurantList = () =>
  createSelector(
    selectRestaurantListDomain,
    substate =>
      // console.log(substate);
      substate,
  );

export default makeSelectRestaurantList;
export { selectRestaurantListDomain };
