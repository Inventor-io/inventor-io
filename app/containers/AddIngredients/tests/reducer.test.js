import { fromJS } from 'immutable';
import addIngredientsReducer from '../reducer';

xdescribe('addIngredientsReducer', () => {
  it('returns the initial state', () => {
    expect(addIngredientsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
