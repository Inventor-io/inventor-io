/**
 *
 * Asynchronously loads the component for NavBar
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
