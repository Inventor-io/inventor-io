import { takeEvery, call, select, put } from 'redux-saga/effects';
import axios from 'axios';
import { selectAddInventoryDomain } from './selectors';
import { selectRestaurantDashboardDomain } from '../RestaurantDashboard/selectors';

import { updateDropdownOption } from './actions';

export default function* inventorySaga() {
  yield [
    takeEvery('app/AddInventory/SEND_QUERY', getUSDA),
    takeEvery('app/AddInventory/SAVE_INV_TO_DB', saveInventoryToDB),
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
    const newInven = yield call(axios, options);
    const s = JSON.parse(newInven.config.data); // TODO: apply body-parser later
    alert(`Saving ${JSON.stringify(s.ingObj)} to db`);
  } catch (e) {
    yield console.error(e);
  }
}
