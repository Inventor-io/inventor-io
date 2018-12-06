import { takeEvery, call, put, select, all } from 'redux-saga/effects';
import axios from 'axios';
import { GET_RECIPES, UPDATE_RECIPELIST, DELETE_RECIPE } from './constants';
import { selectRestaurantDashboardDomain } from '../RestaurantDashboard/selectors';

// Individual exports for testing
export default function* recipePageSaga() {
  yield all([
    takeEvery(GET_RECIPES, getRecs),
    takeEvery(DELETE_RECIPE, sagaDeleteRecipe),
  ]);
}

function* sagaDeleteRecipe(action) {
  try {
    const { selectedRestaurant } = yield select(
      selectRestaurantDashboardDomain,
    );
    const del = {
      url: `/api/recipe`,
      method: `delete`,
      params: {
        recipe_id: action.payload.recipe_id,
        restaurant_id: Number.parseInt(selectedRestaurant, 10),
      },
    };

    const response = yield call(axios, del);
    const recipeList = response.data;
    yield put({
      type: UPDATE_RECIPELIST,
      recipeList,
    });
  } catch (err) {
    console.log('Error in sagaDeleteRecipe:', err);
  }
}

function* getRecs() {
  try {
    const { selectedRestaurant } = yield select(
      selectRestaurantDashboardDomain,
    );
    const get = {
      url: `/api/recipe/get?restaurant=${selectedRestaurant}`,
      method: 'get',
    };
    console.log(`Sending GET to${get.url}`);
    const response = yield call(axios, get);
    const recipeList = response.data;
    console.log('Response:', recipeList);
    yield put({
      type: UPDATE_RECIPELIST,
      recipeList,
    });
  } catch (err) {
    throw err;
  }
}
