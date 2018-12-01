import { fromJS } from 'immutable';
import purchaseCompleteReducer from '../reducer';

describe('purchaseCompleteReducer', () => {
  it('returns the initial state', () => {
    expect(purchaseCompleteReducer(undefined, {})).toEqual(fromJS({}));
  });
});
