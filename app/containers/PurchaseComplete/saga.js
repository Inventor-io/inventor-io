import axios from 'axios';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { FETCH_ORDERLIST } from './constants';
import { passOrders } from './actions';
import { selectRestaurantDashboardDomain } from '../RestaurantDashboard/selectors';

// Individual exports for testing
export default function* purchaseCompleteSaga() {
  yield [takeEvery(FETCH_ORDERLIST, fetchOrder)];
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
