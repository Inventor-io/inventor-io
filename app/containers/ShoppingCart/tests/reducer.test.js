import { fromJS } from 'immutable';
import shoppingCartReducer from '../reducer';

describe('shoppingCartReducer', () => {
  it('returns the initial state', () => {
    expect(shoppingCartReducer(undefined, {})).toEqual(fromJS({}));
  });
});
