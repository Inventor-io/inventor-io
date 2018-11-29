import { fromJS } from 'immutable';
import loginPageReducer from '../reducer';

xdescribe('loginPageReducer', () => {
  it('returns the initial state', () => {
    expect(loginPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
