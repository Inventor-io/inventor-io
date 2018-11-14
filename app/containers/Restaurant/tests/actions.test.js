import { updateAddress } from '../actions';
import { UPDATE_ADDRESS } from '../constants';

describe('Restaurant actions', () => {
  describe('UPDATE_ADDRESS', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: UPDATE_ADDRESS,
      };
      expect(updateAddress()).toEqual(expected);
    });
  });
});
