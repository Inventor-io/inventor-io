import { fromJS } from 'immutable';
import salesPageReducer from '../reducer';

describe('salesPageReducer', () => {
  it('returns the initial state', () => {
    expect(salesPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
