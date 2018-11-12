import { createSelector } from 'reselect';

const selectRouter = state => state.get('router');

const makeSelectCurrentUser = () =>
  createSelector(selectRouter, globalState => globalState.get('currentUser'));

const makeSelectLoading = () =>
  createSelector(selectRouter, globalState => globalState.get('loading'));

const makeSelectError = () =>
  createSelector(selectRouter, globalState => globalState.get('error'));

const makeSelectRepos = () =>
  createSelector(selectRouter, globalState =>
    globalState.getIn(['userData', 'repositories']),
  );

const makeSelectRestaurant = () =>
  createSelector(selectRouter, globalState => globalState.get('restaurant'));

const makeSelectLocation = () =>
  createSelector(selectRouter, routerState =>
    routerState.get('location').toJS(),
  );

export {
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
  makeSelectLocation,
  makeSelectRestaurant,
};
