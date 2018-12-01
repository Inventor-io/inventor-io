/* eslint-disable */
import moment from 'moment';
import makeSelectRestaurantInfo from '../selectors';

export default function getRestaurantCosts(salesInfo) {
  const restaurantInfo = makeSelectRestaurantInfo();
  console.log('SAGA for Dashboard', restaurantInfo);
  // const data = [];
  const date = {};
  // const recipes = {};
  // date[moment(ingredient.date).format('MM/DD/YYYY')] ?
  salesInfo.map(ingredient => {
    // console.log(ingredient);
    const currentDate = moment(ingredient.date).format('MM/DD/YYYY');
    const recipeName = ingredient.recipe_name;
    if (!date[currentDate]) {
      date[currentDate] = {};
    }
    date[currentDate][recipeName]
      ? date[currentDate][recipeName].push(ingredient)
      : (date[currentDate][recipeName] = [ingredient]);
    return null;
  });

  // console.log(date);
  const costPerDay = {};
  for (const d in date) {
    for (const i in date[d]) {
      for (let k = 0; k < date[d][i].length; k++) {
        const individualTotalCost = date[d][i][k].total_cost_ingredient;
        if (!costPerDay[d]) {
          costPerDay[d] = {};
        }
        if (!costPerDay[d][i]) {
          costPerDay[d][i] = { cost: Number(individualTotalCost) };
        }
        costPerDay[d][i].cost =
          costPerDay[d][i].cost + Number(individualTotalCost);
      }
    }
  }

  // console.log(costPerDay);
  // restaurantCosts(costPerDay);
  return costPerDay;
}

export function getRestaurantRevenue(salesInfo) {
  // TODO MAYBE
  return salesInfo;
}
/* eslint-enable */
