import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { RECEIVED_RESTAURANTS } from './constants';
// Individual exports for testing
export default function* restaurantListSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery('app/RestaurantList/GET_RESTAURANTS', getList);
}

function* getList() {
  try {
    const get = {
      url: '/api/restaurant/list',
      method: 'get',
    };
    const response = yield call(axios, get);
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
