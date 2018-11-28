import { fromJS } from 'immutable';
import inventoryReducer from '../reducer';

xdescribe('inventoryReducer', () => {
  it('returns the initial state', () => {
    expect(inventoryReducer(undefined, {})).toEqual(fromJS({}));
  });
});
