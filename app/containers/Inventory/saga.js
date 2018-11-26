import { takeEvery, call, put, select } from 'redux-saga/effects';
import axios from 'axios';
import { GET_DB, ORDER } from './constants';
import { selectInventoryDomain } from './selectors';
import { selectRestaurantDashboardDomain } from '../RestaurantDashboard/selectors';
import { mountDB } from './actions';

// Individual exports for testing
export default function* inventorySaga() {
  yield [takeEvery(GET_DB, getInventory), takeEvery(ORDER, sendOrder)];
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
