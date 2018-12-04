import { fetchOrders } from '../actions';
import { FETCH_ORDERLIST } from '../constants';

describe('PurchaseComplete actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: FETCH_ORDERLIST,
      };
      expect(fetchOrders()).toEqual(expected);
    });
  });
});
