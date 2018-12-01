import axios from 'axios';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { FETCH_ORDERLIST, MAKE_IT_ARRIVE } from './constants';
import { passOrders, tellemItArrived } from './actions';
import { selectRestaurantDashboardDomain } from '../RestaurantDashboard/selectors';
import { selectPurchaseCompleteDomain } from './selectors';

// Individual exports for testing
export default function* purchaseCompleteSaga() {
  yield [
    takeEvery(FETCH_ORDERLIST, fetchOrder),
    takeEvery(MAKE_IT_ARRIVE, bringOrder),
  ];
}

function* fetchOrder() {
  const { selectedRestaurant } = yield select(selectRestaurantDashboardDomain);
  const options = {
    url: 'api/inventory/fetchPrevOrders',
    method: 'POST',
    data: { id: selectedRestaurant },
  };

  try {
    const result = yield call(axios, options);
    yield put(passOrders(result.data));
  } catch (e) {
    // console.log(e);
  }
}

function* bringOrder() {
  const { orderList, i } = yield select(selectPurchaseCompleteDomain);
  const changeThis = orderList[i];
  const { selectedRestaurant } = yield select(selectRestaurantDashboardDomain);

  const options = {
    url: '/api/inventory/deliverIt',
    method: 'POST',
    data: { changeThis, id: selectedRestaurant },
  };

  try {
    yield call(axios, options);
    yield put(tellemItArrived(i, changeThis.quantity));
  } catch (e) {
    console.log(e);
  }
}
