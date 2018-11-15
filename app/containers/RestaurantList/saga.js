import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';
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

    const restaurant = yield put({
      type: 'app/RestaurantList/GET_RESTAURANTS',
      data,
    });
    console.log('getList', restaurant);
  } catch (err) {
    throw err;
  }
}

// Individual exports for testing
