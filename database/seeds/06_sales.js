exports.seed = knex =>
  knex('sales')
    .del()
    .then(() =>
      // Inserts seed entries
      knex('sales').insert([
        {
          recipe_id: 1,
          quantity: 3,
          restaurant_id: 1,
        },
        {
          recipe_id: 2,
          quantity: 20,
          restaurant_id: 1,
        },
        {
          recipe_id: 1,
          quantity: 5,
          restaurant_id: 1,
        },
        {
          recipe_id: 2,
          quantity: 15,
          restaurant_id: 1,
        },
        {
          recipe_id: 3,
          quantity: 2,
          restaurant_id: 1,
        },
      ]),
    );
