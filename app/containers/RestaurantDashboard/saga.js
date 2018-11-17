import { call, select, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { SELECT_RESTAURANT } from './constants';
// import { getRestaurants } from '../RestaurantList/actions';
import { makeSelectRestaurantID } from './selectors';
// Individual exports for testing

function* getRestaurantInfo() {
  console.log('inside saga for select restaurant');
  try {
    const { id } = yield select(makeSelectRestaurantID);
    console.log(id);
    const post = {
      url: '/api/restaurant/getit',
      method: 'post',
      data: id,
    };

    const restaurantQuery = yield call(axios, post);
    console.log(restaurantQuery);
  } catch (e) {
    console.error(e);
  }
}

export default function* restaurantDashboardSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(SELECT_RESTAURANT, getRestaurantInfo);
}


