/**
 *
 * Asynchronously loads the component for Inventory
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
