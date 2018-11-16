import { fromJS } from 'immutable';
import restaurantListReducer from '../reducer';

describe('restaurantListReducer', () => {
  it('returns the initial state', () => {
    expect(restaurantListReducer(undefined, {})).toEqual(fromJS({}));
  });
});
