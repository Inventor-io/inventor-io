import { takeEvery, call, put, select, all } from 'redux-saga/effects';
import axios from 'axios';
import {
  RECEIVED_RESTAURANTS,
  DELETE_RESTAURANT,
  UPDATE_RESTAURANT,
  GET_RESTAURANTS,
} from './constants';
import { FORM_RESPONSE } from '../Restaurant/constants';
import makeSelectLandingPage from '../LandingPage/selectors';
import { getRestaurants } from './actions';
// import { restaurantSuccesfullyDeleted, getRestaurants } from './actions';
// Individual exports for testing
export default function* restaurantListSaga() {
  // See example in containers/HomePage/saga.js
  yield all([
    takeEvery(GET_RESTAURANTS, getList),
    takeEvery(FORM_RESPONSE, getList),
    takeEvery(DELETE_RESTAURANT, deleteRestaurant),
    takeEvery(UPDATE_RESTAURANT, updateRestaurant),
  ]);
}

function* getList() {
  console.log('GETTING TO SAGA');
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

function* deleteRestaurant({ restaurantId }) {
  console.log('DELETE SAGA', restaurantId);
  try {
    const post = {
      url: '/api/restaurant/delete',
      method: 'post',
      data: { id: restaurantId },
    };
    const response = yield call(axios, post);
    console.log(response);
    // yield put(restaurantSuccesfullyDeleted(restaurantId));
    yield put(getRestaurants());
  } catch (err) {
    throw err;
  }
}

function* updateRestaurant({ restaurantUpdate }) {
  console.log('UpdateRestaurant', restaurantUpdate);
  // {id, name, address, phoneNumber, website} = restaurantUpdate;
  try {
    const post = {
      url: '/api/restaurant/update',
      method: 'post',
      data: {
        restaurantId: restaurantUpdate.id,
        name: restaurantUpdate.name,
        address: restaurantUpdate.address,
        phoneNumber: restaurantUpdate.phoneNumber,
        website: restaurantUpdate.website,
      },
    };
    const response = yield call(axios, post);
    yield put(getRestaurants());
    console.log('update response recieved', response);
  } catch (err) {
    throw err;
  }
}
// Individual exports for testing
