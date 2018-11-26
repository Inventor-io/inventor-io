import { call, takeEvery, select, all, put } from 'redux-saga/effects';
import axios from 'axios';
import { selectAddRecipePageDomain } from './selectors';
import {
  SEND_FORM,
  GET_INGREDIENTSLIST,
  UPDATE_INGREDIENTSLIST,
} from './constants';
import { selectRestaurantDashboardDomain } from '../RestaurantDashboard/selectors';

// Individual exports for testing
export default function* addRecipePageSaga() {
  yield all([
    takeEvery(GET_INGREDIENTSLIST, getIngredients),
    takeEvery(SEND_FORM, sendRecipe),
  ]);
}

function* sendRecipe() {
  // selector bits
  console.log('SEND RECIPE CALLED');
  const { recName, recPrice } = yield select(selectAddRecipePageDomain);
  const userInfo = yield select(selectRestaurantDashboardDomain);
  const userId = userInfo.selectedRestaurant;
  const data = {
    recipe_name: recName,
    restaurant_id: userId,
    price: recPrice,
  };

  try {
    const post = {
      url: '/api/recipe/create',
      method: 'post',
      data,
    };
    const response = yield call(axios, post);
    const responseBody = response;
    console.log('INSIDE SAGA!!!!!!!!!!!!!!', responseBody);
  } catch (e) {
    yield console.error(e);
  }
}

function* getIngredients() {
  try {
    const { recId } = yield select(selectAddRecipePageDomain);
    const get = {
      url: `/api/recipe/ingredients?recipe=${recId}`,
      method: 'get',
    };
    console.log(`Sending GET to ${get.url}`);
    const response = yield call(axios, get);
    const ingredientsList = response.data;
    console.log('Response:', ingredientsList);
    yield put({
      type: UPDATE_INGREDIENTSLIST,
      ingredientsList,
    });
  } catch (err) {
    throw err;
  }
}
