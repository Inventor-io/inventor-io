import { updateName } from '../actions';
import { UPDATE_NAME } from '../constants';

xdescribe('AddRecipePage actions', () => {
  xdescribe('Default Action', () => {
    it('has a type of DEFAULT_ACTION', () => {
      const expected = {
        type: UPDATE_NAME,
      };
      expect(updateName()).toEqual(expected);
    });
  });
});
