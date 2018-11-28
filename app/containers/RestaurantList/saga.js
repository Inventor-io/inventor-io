import { takeEvery, call, put, select } from 'redux-saga/effects';
import axios from 'axios';
import { RECEIVED_RESTAURANTS } from './constants';
import makeSelectLandingPage from '../LandingPage/selectors';
// Individual exports for testing
export default function* restaurantListSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery('app/RestaurantList/GET_RESTAURANTS', getList);
}

function* getList() {
  const userInfo = yield select(makeSelectLandingPage());
  console.log(userInfo.id);
  try {
    const post = {
      url: '/api/restaurant/list',
      method: 'post',
      data: { userId: userInfo.id },
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

    console.log('getList', restaurants);
  } catch (err) {
    throw err;
  }
}

// Individual exports for testing
