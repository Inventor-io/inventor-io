import { fromJS } from 'immutable';
import addRecipePageReducer from '../reducer';

describe('addRecipePageReducer', () => {
  it('returns the initial state', () => {
    expect(addRecipePageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
