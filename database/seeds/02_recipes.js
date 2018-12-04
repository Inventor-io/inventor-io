const readJSONFile = require('../readJSONFile');
const data = readJSONFile('./database/seedJSON/df_02.json');

exports.seed = knex =>
  knex('recipes')
    .del()
    .then(() =>
      // Inserts seed entries
      // knex('recipes').insert([
      //   {
      //     restaurant_id: 1,
      //     recipe_name: 'Hamburger',
      //     price: 4.5,
      //   },
      //   {
      //     restaurant_id: 1,
      //     recipe_name: 'Cheese burger',
      //     price: 5.5,
      //   },
      //   {
      //     restaurant_id: 1,
      //     recipe_name: 'Salad',
      //     price: 7,
      //   },
      // ]),
      knex('recipes').insert(data),
    );
