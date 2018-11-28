import { takeEvery, call, put, select } from 'redux-saga/effects';
import axios from 'axios';
import { GET_DB, ORDER, DEL_INVEN } from './constants';
import { selectInventoryDomain } from './selectors';
import { selectRestaurantDashboardDomain } from '../RestaurantDashboard/selectors';
import { mountDB, replaceInven } from './actions';

// Individual exports for testing
export default function* inventorySaga() {
  yield [
    takeEvery(GET_DB, getInventory),
    takeEvery(ORDER, sendOrder),
    takeEvery(DEL_INVEN, deleteInventory),
  ];
}

function* getInventory() {
  const { selectedRestaurant } = yield select(selectRestaurantDashboardDomain);
  const options = {
    url: '/api/inventory/',
    method: 'POST',
    data: { id: selectedRestaurant },
  };

  try {
    const res = yield call(axios, options);
    yield put(mountDB(res.data));
  } catch (e) {
    // console.error(e);
  }
}

function* sendOrder() {
  const { selected } = yield select(selectInventoryDomain);

  const options = {
    url: '/api/inventory/orderInv',
    method: 'POST',
    data: { ingObj: selected },
  };

  try {
    const order = yield call(axios, options);
    const s = JSON.parse(order.config.data);
    alert(`Placing order... ${JSON.stringify(s.ingObj)}`);
  } catch (e) {
    console.error(e);
  }
}

function* deleteInventory() {
  const { delItem, currentInventory } = yield select(selectInventoryDomain);

  const options = {
    url: '/api/inventory/deleteInventory',
    method: 'POST',
    data: { ndbno: delItem },
  };

  try {
    let arr = currentInventory.slice();
    arr = arr.filter(obj => obj.ndbno !== delItem);
    yield call(axios, options); // delete in db
    yield put(replaceInven(arr)); // send to front end
  } catch (e) {
    console.error(e);
  }
}
