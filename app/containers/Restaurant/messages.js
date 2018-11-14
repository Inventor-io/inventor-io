/*
 * Restaurant Messages
 *
 * This contains all the text for the Restaurant container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Restaurant';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Restaurant container!',
  },
});
