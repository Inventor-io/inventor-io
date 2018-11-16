import { fromJS } from 'immutable';
import restaurantDashboardReducer from '../reducer';

describe('restaurantDashboardReducer', () => {
  it('returns the initial state', () => {
    expect(restaurantDashboardReducer(undefined, {})).toEqual(fromJS({}));
  });
});
