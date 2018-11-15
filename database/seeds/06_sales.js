exports.seed = knex =>
  knex('sales')
    .del()
    .then(() =>
      // Inserts seed entries
      knex('sales').insert([
        {
          recipe_id: 1,
          quantity: 3,
        },
        {
          recipe_id: 2,
          quantity: 20,
        },
        {
          recipe_id: 1,
          quantity: 5,
        },
        {
          recipe_id: 2,
          quantity: 15,
        },
        {
          recipe_id: 3,
          quantity: 2,
        },
      ]),
    );
