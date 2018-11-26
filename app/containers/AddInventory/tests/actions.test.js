import { updateSearchTerm } from '../actions';
import { UPDATE_SEARCHTERM } from '../constants';

describe('AddInventory actions', () => {
  describe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: UPDATE_SEARCHTERM,
      };
      expect(updateSearchTerm()).toEqual(expected);
    });
  });
});
