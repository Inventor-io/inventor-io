import { takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';

// Individual exports for testing
export default function* loginPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery('app/LoginPage/LOGIN', login);
}
function* login() {
  try {
    const get = {
      url: '/api/auth/login/facebook',
      method: 'get',
    };
    const response = yield call(axios, get);
    console.log(response);
  } catch (e) {
    yield console.error(e);
  }
}
