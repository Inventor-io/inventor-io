import { getRecipes } from '../actions';
import { GET_RECIPES } from '../constants';

xdescribe('RecipePage actions', () => {
  xdescribe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: GET_RECIPES,
      };
      expect(getRecipes()).toEqual(expected);
    });
  });
});
