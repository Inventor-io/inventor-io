import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { GET_DB } from './constants';
// import { selectInventoryDomain } from './selectors';
import { mountDB } from './actions';

// Individual exports for testing
export default function* inventorySaga() {
  yield takeEvery(GET_DB, getInventory);
}

function* getInventory() {
  const options = {
    url: '/api/inventory/',
  };

  try {
    const res = yield call(axios, options);
    yield put(mountDB(res.data));
  } catch (e) {
    // console.error(e);
  }
}
