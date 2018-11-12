import { fromJS } from 'immutable';
import recipePageReducer from '../reducer';

describe('recipePageReducer', () => {
  it('returns the initial state', () => {
    expect(recipePageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
