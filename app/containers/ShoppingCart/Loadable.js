/**
 *
 * Asynchronously loads the component for ShoppingCart
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
