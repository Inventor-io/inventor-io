/*
 *
 * LandingPage actions
 *
 */

import { DEFAULT_ACTION, NAVIGATE } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function navigateAction(location) {
  return {
    type: NAVIGATE,
    location,
  };
}
