/* eslint-disable */

import { call, takeEvery, select, put } from 'redux-saga/effects';
import axios from 'axios';
import { selectRestaurantDomain } from './selectors';
import { SEND_FORM } from './constants';
import makeSelectLandingPage from '../LandingPage/selectors';
import formResponse from './actions';
import { getRestaurants } from '../RestaurantList/actions';

// put, select, take,
export const getRestaurant = state => state.restaurant;

// Individual exports for testing
// import SEND_FORM from './constants';
export default function* restaurantSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(SEND_FORM, getServer);
}
function* getServer() {
  const userInfo = yield select(makeSelectLandingPage());
  let userID;
  userInfo.id
    ? (userID = userInfo.id)
    : (userID = localStorage.getItem('userId'));
  const { resAddress, resName, resNumber, resWebsite } = yield select(
    selectRestaurantDomain,
  );
  const data = {
    restaurants_name: resName,
    restaurant_address: resAddress,
    restaurant_phone_number: resNumber,
    restaurant_website: resWebsite,
    user_id: userID,
  };
  // console.log('being sent to database', data);
  // let url = null;
  // const isDev = process.env.NODE_ENV !== 'production';

  // if (isDev) {
  //   console.log(process.env.CLIENT_HOST);
  //   url = `${process.env.CLIENT_HOST}/api/restaurant`;
  // } else {
  //   url = '/api/restaurant';
  // }
  try {
    // console.log('SAGAGAGAGA RESTAURANT', state);

    const post = {
      url: '/api/restaurant/create',
      method: 'post',
      data,
    };
    const response = yield call(axios, post);
    const responseBody = response;
    console.log('INSIDE SAGA!!!!!!!!!!!!!!', responseBody);
    //yield put(formResponse());
    yield put({
      type: GET_RESTAURANTS,
    });
  } catch (e) {
    yield console.error(e);
  }
}
/* eslint-enable */
