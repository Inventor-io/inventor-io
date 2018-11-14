exports.seed = knex =>
  knex('sales')
    .del()
    .then(() =>
      // Inserts seed entries
      knex('sales').insert([
        {
          id: 1,
          recipe_id: 1,
          quantity: 3,
        },
        {
          id: 2,
          recipe_id: 2,
          quantity: 20,
        },
        {
          id: 3,
          recipe_id: 1,
          quantity: 5,
        },
        {
          id: 4,
          recipe_id: 2,
          quantity: 15,
        },
        {
          id: 5,
          recipe_id: 3,
          quantity: 2,
        },
      ]),
    );
