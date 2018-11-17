import { call, takeEvery, select } from 'redux-saga/effects';
import axios from 'axios';
import { selectAddRecipePageDomain } from './selectors';

// Individual exports for testing
export default function* addRecipePageSaga() {
  yield takeEvery('app/AddRecipePage/SEND_FORM', sendRecipe);
}

function* sendRecipe() {
  // selector bits
  console.log('SEND RECIPE CALLED');
  const { recName, recPrice } = yield select(selectAddRecipePageDomain);
  const data = {
    recipe_name: recName,
    restaurant_id: 1,
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
