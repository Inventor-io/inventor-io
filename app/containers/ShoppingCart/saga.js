import axios from 'axios';
import { takeEvery, call, select, put } from 'redux-saga/effects';
import { PLACE_ORDER, CALL_MOUNT_ORDER } from './constants';
import { sendMountOrder, wipeCart } from './actions';
import { selectInventoryDomain } from '../Inventory/selectors';
import { selectShoppingCartDomain } from './selectors';
import { selectRestaurantDashboardDomain } from '../RestaurantDashboard/selectors';

// Individual exports for testing
export default function* shoppingCartSaga() {
  yield [
    takeEvery(PLACE_ORDER, placeOrder),
    takeEvery(CALL_MOUNT_ORDER, mountFromInven),
  ];
}

function* placeOrder() {
  const { orderList } = yield select(selectShoppingCartDomain);
  const { selectedRestaurant } = yield select(selectRestaurantDashboardDomain);

  const options = {
    url: '/api/inventory/orderInv',
    method: 'POST',
    data: { orderList, id: selectedRestaurant },
  };

  try {
    alert(`Your order has gone through! For: ${JSON.stringify(orderList)}`);
    yield call(axios, options);
    yield put(wipeCart());
  } catch (e) {
    // console.log(e);
  }
}

function* mountFromInven() {
  const { formatted } = yield select(selectInventoryDomain);
  if (formatted) {
    const copy = formatted.slice();
    yield put(sendMountOrder(copy));
  }
}
