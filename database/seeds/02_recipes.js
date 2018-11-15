exports.seed = knex =>
  knex('recipes')
    .del()
    .then(() =>
      // Inserts seed entries
      knex('recipes').insert([
        {
          recipe_id: 1,
          restaurant_id: 1,
          recipe_name: 'Hamburger',
          price: 4.5,
        },
        {
          recipe_id: 2,
          restaurant_id: 1,
          recipe_name: 'Cheese burger',
          price: 5.5,
        },
        {
          recipe_id: 3,
          restaurant_id: 1,
          recipe_name: 'Salad',
          price: 7,
        },
      ]),
    );
