import { takeEvery, call, put, select, all } from 'redux-saga/effects';
import axios from 'axios';
import { push } from 'connected-react-router/immutable';
import { GET_DB, ORDER, DEL_INVEN } from './constants';
import { selectInventoryDomain } from './selectors';
import { selectRestaurantDashboardDomain } from '../RestaurantDashboard/selectors';
import { mountDB, replaceInven, formattedOrder } from './actions';

// Individual exports for testing
export default function* inventorySaga() {
  yield all([
    takeEvery(GET_DB, getInventory),
    takeEvery(ORDER, sendOrder),
    takeEvery(DEL_INVEN, deleteInventory),
  ]);
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
  const { selectedRestaurant } = yield select(selectRestaurantDashboardDomain);

  const options = {
    url: '/api/inventory/formatInv',
    method: 'POST',
    data: { orderndbnos: selected, id: selectedRestaurant },
  };

  if (!selected.length) {
    alert('Please select an item');
  } else {
    try {
      const result = yield call(axios, options);
      yield put(formattedOrder(result.data));
      yield put(push('/shoppingCart'));
    } catch (e) {
      // console.error(e);
    }
  }
}

function* deleteInventory() {
  const { delItem, currentInventory } = yield select(selectInventoryDomain);
  const { selectedRestaurant } = yield select(selectRestaurantDashboardDomain);

  const options = {
    url: '/api/inventory/deleteInventory',
    method: 'POST',
    data: { ndbno: delItem, id: selectedRestaurant },
  };

  try {
    let arr = currentInventory.slice();
    arr = arr.filter(obj => obj.ndbno !== delItem);
    const result = yield call(axios, options); // delete in db

    if (result.data[0] === 'alert') {
      alert(
        `Please modify recipes using ndbno ${delItem}: ${JSON.stringify(
          result.data[1],
        )}`,
      );
    } else {
      yield put(replaceInven(arr)); // send to front end
    }
  } catch (e) {
    console.error(e);
  }
}
