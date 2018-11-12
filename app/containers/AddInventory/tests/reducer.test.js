import { fromJS } from 'immutable';
import addInventoryReducer from '../reducer';

describe('addInventoryReducer', () => {
  it('returns the initial state', () => {
    expect(addInventoryReducer(undefined, {})).toEqual(fromJS({}));
  });
});
