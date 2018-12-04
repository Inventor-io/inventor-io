import { takeEvery, call, put, select, all } from 'redux-saga/effects';
import axios from 'axios';
import { RECEIVED_RESTAURANTS } from './constants';
import { FORM_RESPONSE } from '../Restaurant/constants';
import makeSelectLandingPage from '../LandingPage/selectors';
// Individual exports for testing
export default function* restaurantListSaga() {
  // See example in containers/HomePage/saga.js
  yield all([
    takeEvery('app/RestaurantList/GET_RESTAURANTS', getList),
    takeEvery(FORM_RESPONSE, getList),
  ]);
}

function* getList() {
  const userInfo = yield select(makeSelectLandingPage());
  let userID;
  /* eslint-disable */
  userInfo.id
    ? (userID = userInfo.id)
    : (userID = localStorage.getItem('userId'));
  console.log(userInfo.id);
  /* eslint-enable */
  try {
    const post = {
      url: '/api/restaurant/list',
      method: 'post',
      data: { userId: userID },
    };
    const response = yield call(axios, post);
    const { data } = response;
    const restaurants = data;
    // const restaurants = data;
    // console.log(RECEIVED_RESTAURANTS);
    yield put({
      type: RECEIVED_RESTAURANTS,
      restaurants,
    });

    // console.log('getList', restaurants);
  } catch (err) {
    throw err;
  }
}

// Individual exports for testing
