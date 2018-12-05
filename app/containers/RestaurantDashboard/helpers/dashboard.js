/* eslint-disable */
import moment from 'moment';
import makeSelectRestaurantInfo from '../selectors';
import flatten from 'flat';

export function getRestaurantCosts(salesInfo) {
  //const restaurantInfo = await makeSelectRestaurantInfo();
  //console.log('SAGA for Dashboard', restaurantInfo);
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

export function combineRevenueAndSales(costs, sales) {
  sales.map(sale => {
    // console.log(ingredient);
    const currentDate = moment(sale.date).format('MM/DD/YYYY');
    const recipeName = sale.recipe_name;
    // if (!date[currentDate]) {
    //   date[currentDate] = {};
    // }
    costs[currentDate][`${recipeName}_revenue`] = sale.sum;
  });

  //console.log('COSTS', costs);
  const array = [];
  for (let key in costs) {
    array.push(Object.assign({ date: key }, costs[key]));
  }

  for (let i = 0; i < array.length; i++) {
    for (let key in array[i]) {
      if (array[i][key].cost) {
        array[i][`${key}_cost`] = array[i][key].cost;
        delete array[i][key];
      }
    }
  }
  //console.log(array);
  array.sort((a, b) => {
    let splitA = a.date.split('/');
    let splitB = b.date.split('/');

    return splitA[0] + splitA[1] - (splitB[0] + splitB[1]);
  });

  //console.log(array);

  return array;
}

export function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  // console.log('color', color);
  return color;
}
/* eslint-enable */
