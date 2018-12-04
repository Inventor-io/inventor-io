import axios from 'axios';
import { push } from 'connected-react-router/immutable';
import { takeEvery, call, select, put, all } from 'redux-saga/effects';
import { PLACE_ORDER, CALL_MOUNT_ORDER, DELETE_ITEM } from './constants';
import { sendMountOrder, wipeCart } from './actions';
import { selectInventoryDomain } from '../Inventory/selectors';
import { selectShoppingCartDomain } from './selectors';
import { wipeChecked, delFromOrderList } from '../Inventory/actions';
import { selectRestaurantDashboardDomain } from '../RestaurantDashboard/selectors';

// Individual exports for testing
export default function* shoppingCartSaga() {
  yield all([
    takeEvery(PLACE_ORDER, placeOrder),
    takeEvery(CALL_MOUNT_ORDER, mountFromInven),
    takeEvery(DELETE_ITEM, deleteItem),
  ]);
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
    // alert(`Your order has gone through! For: ${JSON.stringify(orderList)}`);
    yield call(axios, options);
    yield put(wipeCart());
    yield put(wipeChecked()); // clear 'selected' state in inventory
    yield put(wipeChecked()); // clear 'formatted' state in inventory
    yield put(push('/purchaseComplete'));
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

function* deleteItem() {
  const { orderList } = yield select(selectShoppingCartDomain);

  yield put(delFromOrderList(orderList));
}
