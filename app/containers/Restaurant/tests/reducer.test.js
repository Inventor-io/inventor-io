import { fromJS } from 'immutable';
import restaurantReducer from '../reducer';

describe('restaurantReducer', () => {
  it('returns the initial state', () => {
    expect(restaurantReducer(undefined, {})).toEqual(fromJS({}));
  });
});
