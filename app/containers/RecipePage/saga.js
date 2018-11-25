import { takeEvery, call, put, select } from 'redux-saga/effects';
// import { call, takeEvery, select } from 'redux-saga/effects';
import axios from 'axios';
// import selectRecipePageDomain from './selectors';
import { GET_RECIPES, UPDATE_RECIPELIST } from './constants';
import { selectRestaurantDashboardDomain } from '../RestaurantDashboard/selectors';

// Individual exports for testing
export default function* recipePageSaga() {
  yield takeEvery(GET_RECIPES, getRecs);
}

function* getRecs() {
  try {
    const { selectedRestaurant } = yield select(
      selectRestaurantDashboardDomain,
    );
    const get = {
      url: `/api/recipe/${selectedRestaurant}`,
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

    // console.log('getList', recipeList);
  } catch (err) {
    throw err;
  }
}
