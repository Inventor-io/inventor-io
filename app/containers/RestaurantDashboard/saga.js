import { takeEvery, select, call } from 'redux-saga/effects';
// select, call , ,
import axios from 'axios';
import { LOAD_INFO } from './constants';
// import { getRestaurant } from '../RestaurantList/actions';
import { selectRestaurantDashboardDomain } from './selectors';
// Individual exports for testing

function* getRestaurantInfo() {
  console.log('inside saga for select restaurant');
  const { selectedRestaurant } = yield select(selectRestaurantDashboardDomain);
  console.log(selectedRestaurant);
  try {
    const post = {
      url: '/api/restaurant/getit',
      method: 'post',
      data: Number(selectedRestaurant),
    };

    const restaurantQuery = yield call(axios, post);
    console.log(restaurantQuery);
  } catch (e) {
    // console.error(e);
    throw e;
  }
}

export default function* restaurantDashboardSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(LOAD_INFO, getRestaurantInfo);
}
