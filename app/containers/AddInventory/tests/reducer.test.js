import { fromJS } from 'immutable';
import addInventoryReducer from '../reducer';

xdescribe('addInventoryReducer', () => {
  it('returns the initial state', () => {
    expect(addInventoryReducer(undefined, {})).toEqual(fromJS({}));
  });
});
