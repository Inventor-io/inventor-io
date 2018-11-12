import { fromJS } from 'immutable';
import inventoryReducer from '../reducer';

describe('inventoryReducer', () => {
  it('returns the initial state', () => {
    expect(inventoryReducer(undefined, {})).toEqual(fromJS({}));
  });
});
