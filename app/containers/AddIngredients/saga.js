import { takeEvery, call, select, put, all } from 'redux-saga/effects';
import axios from 'axios';
import { push } from 'connected-react-router/immutable';
import { selectAddIngredientsDomain } from './selectors';
import { selectRestaurantDashboardDomain } from '../RestaurantDashboard/selectors';
import { REMOVE_ITEM, SEND_QUERY, SAVE_INV_TO_DB } from './constants';
import { updateDropdownOption, replaceAddedIng, redirect } from './actions';
import { selectAddRecipePageDomain } from '../AddRecipePage/selectors';

export default function* ingredientsSaga() {
  yield all([
    takeEvery(SEND_QUERY, getUSDA),
    takeEvery(SAVE_INV_TO_DB, saveIngredientsToDB),
    takeEvery(REMOVE_ITEM, deleteItem),
  ]);
}

function* getUSDA() {
  const { searchTerm } = yield select(selectAddIngredientsDomain);
  const options = {
    url: '/api/inventory/usdaSearch', // TODO
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

function* saveIngredientsToDB() {
  const { addedIngredients } = yield select(selectAddIngredientsDomain);
  const { recId, recName, recPrice } = yield select(selectAddRecipePageDomain);
  const { selectedRestaurant } = yield select(selectRestaurantDashboardDomain);
  const options = {
    url: '/api/recipe/ingredients',
    method: 'post',
    data: {
      ingObj: addedIngredients,
      recipe: recId,
      restaurant: selectedRestaurant,
    },
  };
  try {
    yield call(axios, options);
    yield put(redirect());
    yield put(push(`/editRecipe?id=4&name=${recName}&price=${recPrice}`));
  } catch (e) {
    yield console.error(e);
  }
}

function* deleteItem() {
  const { addedIngredients, remove } = yield select(selectAddIngredientsDomain);
  const arr = addedIngredients.slice();
  arr.splice(arr.indexOf(remove), 1);
  yield put(replaceAddedIng(arr));
}
