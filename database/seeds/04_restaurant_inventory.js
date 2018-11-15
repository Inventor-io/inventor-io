exports.seed = knex =>
  knex('restaurant_inventory')
    .del()
    .then(() =>
      // Inserts seed entries
      knex('restaurant_inventory').insert([
        {
          restaurant_id: 1,
          ndbno: '18064',
          quantity: 50,
        },
        {
          restaurant_id: 1,
          ndbno: '13317',
          quantity: 40,
        },
        {
          restaurant_id: 1,
          ndbno: '11251',
          quantity: 30,
        },
        {
          restaurant_id: 1,
          ndbno: '11529',
          quantity: 300,
        },
        {
          restaurant_id: 1,
          ndbno: '01270',
          quantity: 20,
        },
        {
          restaurant_id: 1,
          ndbno: '11233',
          quantity: 45,
        },
        {
          restaurant_id: 1,
          ndbno: '11205',
          quantity: 35,
        },
      ]),
    );
