import { call, takeEvery, select } from 'redux-saga/effects';
import axios from 'axios';
import { selectRestaurantDomain } from './selectors';

// put, select, take,
export const getRestaurant = state => state.restaurant;

// Individual exports for testing
// import SEND_FORM from './constants';
export default function* restaurantSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery('app/Restaurant/SEND_FORM', getServer);
}
function* getServer() {
  const { resAddress, resName, resNumber } = yield select(
    selectRestaurantDomain,
  );
  const data = { resAddress, resName, resNumber };
  console.log(data);
  try {
    // console.log('SAGAGAGAGA RESTAURANT', state);

    const post = {
      url: '/api/restaurant',
      method: 'post',
      data: { resAddress, resName, resNumber },
    };
    const response = yield call(axios, post);
    const responseBody = response;
    console.log('INSIDE SAGA!!!!!!!!!!!!!!', responseBody);
  } catch (e) {
    yield console.error(e);
  }
}
