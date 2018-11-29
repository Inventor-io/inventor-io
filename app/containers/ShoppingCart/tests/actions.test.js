import { deleteItem } from '../actions';
import { DELETE_ITEM } from '../constants';

describe('ShoppingCart actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: DELETE_ITEM,
      };
      expect(deleteItem()).toEqual(expected);
    });
  });
});
