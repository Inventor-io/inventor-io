exports.seed = knex =>
  knex('restaurant_inventory')
    .del()
    .then(() =>
      // Inserts seed entries
      knex('restaurant_inventory').insert([
        {
          id: 1,
          restaurant_id: 1,
          ndbno: '18064',
          quantity: 50,
        },
        {
          id: 2,
          restaurant_id: 1,
          ndbno: '13317',
          quantity: 40,
        },
        {
          id: 3,
          restaurant_id: 1,
          ndbno: '11251',
          quantity: 30,
        },
        {
          id: 4,
          restaurant_id: 1,
          ndbno: '11529',
          quantity: 300,
        },
        {
          id: 5,
          restaurant_id: 1,
          ndbno: '01270',
          quantity: 20,
        },
        {
          id: 6,
          restaurant_id: 1,
          ndbno: '11233',
          quantity: 45,
        },
        {
          id: 7,
          restaurant_id: 1,
          ndbno: '11205',
          quantity: 35,
        },
      ]),
    );
