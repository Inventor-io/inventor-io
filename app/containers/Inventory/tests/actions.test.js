import { getInventory } from '../actions';
import { GET_DB } from '../constants';

xdescribe('Inventory actions', () => {
  xdescribe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: GET_DB,
      };
      expect(getInventory()).toEqual(expected);
    });
  });
});
