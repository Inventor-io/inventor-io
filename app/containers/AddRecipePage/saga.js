import { call, takeEvery, select, all, put } from 'redux-saga/effects';
import axios from 'axios';
import { selectAddRecipePageDomain } from './selectors';
import {
  SEND_FORM,
  GET_INGREDIENTSLIST,
  UPDATE_INGREDIENTSLIST,
  DELETE_INGREDIENT,
  // UPDATE_INGREDIENT_AMOUNT,
  APPLY_REC_CHANGES,
  UPDATE_MODAL,
} from './constants';
import { selectRestaurantDashboardDomain } from '../RestaurantDashboard/selectors';
import history from '../../utils/history';
import { clearState } from '../AddIngredients/actions';

// Individual exports for testing
export default function* addRecipePageSaga() {
  yield all([
    takeEvery(GET_INGREDIENTSLIST, getIngredients),
    takeEvery(SEND_FORM, sendRecipe),
    takeEvery(DELETE_INGREDIENT, deleteIngredient),
    // takeEvery(UPDATE_INGREDIENT_AMOUNT, updateIngredientAmount),
    takeEvery(APPLY_REC_CHANGES, updateRecipe),
    takeEvery(UPDATE_MODAL, clearModal),
  ]);
}

// function* updateIngredientAmount(action) {
//   try {
//     // const axiosArgs = {
//     //   url: '/api/recipe/ingredients',
//     //   method: 'patch',
//     //   params: action.payload,
//     // };
//     // disabled for testing yield call(axios, axiosArgs);
//   } catch (e) {
//     yield console.error(e);
//   }
// }

// Delete an Ingredient from the recipe
function* deleteIngredient(action) {
  try {
    const { ingredientsList } = yield select(selectAddRecipePageDomain);
    // const axiosArgs = {
    //   url: '/api/recipe/ingredients',
    //   method: 'delete',
    //   params: action.payload,
    // };
    // yield call(axios, axiosArgs);

    const purgedList = ingredientsList.filter(
      recipe => recipe.ndbno !== action.payload.ndbno,
    );
    yield put({
      type: UPDATE_INGREDIENTSLIST,
      ingredientsList: purgedList,
    });
  } catch (e) {
    // yield console.error(e);
  }
}

function* sendRecipe() {
  // selector bits
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
    yield call(axios, post);
  } catch (e) {
    // yield console.error(e);
  }
  history.push('/recipe');
}

function* getIngredients() {
  try {
    const { recId } = yield select(selectAddRecipePageDomain);
    const get = {
      url: `/api/recipe/ingredients?recipe=${recId}`,
      method: 'get',
    };
    const response = yield call(axios, get);
    const ingredientsList = response.data;
    yield put({
      type: UPDATE_INGREDIENTSLIST,
      ingredientsList,
    });
  } catch (err) {
    // throw err;
  }
}

function* updateRecipe() {
  const { recName, recPrice, ingredientsList, recId } = yield select(
    selectAddRecipePageDomain,
  );
  const userInfo = yield select(selectRestaurantDashboardDomain);
  const userId = userInfo.selectedRestaurant;
  try {
    if (ingredientsList.length) {
      // save to inventory table
      const postInven = {
        url: '/api/inventory/addIngToDB',
        method: 'POST',
        data: { ingObj: ingredientsList, id: userId },
      };
      yield call(axios, postInven);
    }

    // save ingredients to recipe_inventory
    const postRecInven = {
      url: '/api/recipe/upsertIngredients',
      method: 'POST',
      data: ingredientsList.length ? ingredientsList : { recId },
    };
    yield call(axios, postRecInven);

    // upsert price
    const data = {
      recipe_name: recName,
      restaurant_id: userId,
      price: recPrice,
    };

    const post = {
      url: '/api/recipe/upsertPrice',
      method: 'post',
      data,
    };
    yield call(axios, post);

    history.push('/recipe');
  } catch (e) {
    console.log(e);
  }
}

function* clearModal() {
  yield put(clearState());
}
