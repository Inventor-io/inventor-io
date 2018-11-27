import { takeEvery, call, select, put } from 'redux-saga/effects';
import axios from 'axios';
import { selectAddInventoryDomain } from './selectors';
import { selectRestaurantDashboardDomain } from '../RestaurantDashboard/selectors';
import { REMOVE_ITEM, SEND_QUERY, SAVE_INV_TO_DB } from './constants';
import { updateDropdownOption, replaceAddedIng } from './actions';

export default function* inventorySaga() {
  yield [
    takeEvery(SEND_QUERY, getUSDA),
    takeEvery(SAVE_INV_TO_DB, saveInventoryToDB),
    takeEvery(REMOVE_ITEM, deleteItem),
  ];
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

function* saveInventoryToDB() {
  const { addedIngredients } = yield select(selectAddInventoryDomain);
  const { selectedRestaurant } = yield select(selectRestaurantDashboardDomain);
  const options = {
    url: '/api/inventory/addIngToDB',
    method: 'post',
    data: { ingObj: addedIngredients, id: selectedRestaurant },
  };

  try {
    yield call(axios, options);
  } catch (e) {
    yield console.error(e);
  }
}

function* deleteItem() {
  const { addedIngredients, remove } = yield select(selectAddInventoryDomain);
  const arr = addedIngredients.slice();
  arr.splice(arr.indexOf(remove), 1);
  yield put(replaceAddedIng(arr));
}
