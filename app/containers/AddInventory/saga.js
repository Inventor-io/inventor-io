import { takeEvery, call, select, put } from 'redux-saga/effects';
import axios from 'axios';
import { selectAddInventoryDomain } from './selectors';

import { updateDropdownOption } from './actions';

export default function* inventorySaga() {
  yield takeEvery('app/AddInventory/SEND_QUERY', getUSDA);
}

function* getUSDA() {
  const { searchTerm } = yield select(selectAddInventoryDomain);

  const options = {
    url: '/api/inventory/usdaSearch',
    method: 'post',
    data: { searchTerm },
  };

  try {
    const res = yield call(axios, options);
    yield put(updateDropdownOption(res.data));
  } catch (e) {
    yield console.error(e);
  }
}
