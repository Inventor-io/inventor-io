exports.seed = knex =>
  knex('recipe_inventory')
    .del()
    .then(() =>
      // Inserts seed entries
      knex('recipe_inventory').insert([
        {
          recipe_id: 1, // hamburger
          ndbno: '18064', // bun
          measurement: 2,
        },
        {
          recipe_id: 1,
          ndbno: '13317', // patty
          measurement: 1,
        },
        {
          recipe_id: 1,
          ndbno: '11251', // lettuce
          measurement: 1,
        },
        {
          recipe_id: 1,
          ndbno: '11529', // tomato
          measurement: 1,
        },
        {
          recipe_id: 2, // cheese burger
          ndbno: '18064', // bun
          measurement: 2,
        },
        {
          recipe_id: 2,
          ndbno: '13317', // patty
          measurement: 1,
        },
        {
          recipe_id: 2,
          ndbno: '11251', // lettuce
          measurement: 1,
        },
        {
          recipe_id: 2,
          ndbno: '11529', // tomato
          measurement: 1,
        },
        {
          recipe_id: 2,
          ndbno: '01270', // cheese
          measurement: 1,
        },
        {
          recipe_id: 3, // salad
          ndbno: '11251', // lettuce
          measurement: 10,
        },
        {
          recipe_id: 3,
          ndbno: '11529', // tomato
          measurement: 5,
        },
        {
          recipe_id: 3,
          ndbno: '11205', // cucumber
          measurement: 4,
        },
        {
          recipe_id: 3,
          ndbno: '11233', // kale
          measurement: 3,
        },
      ]),
    );
