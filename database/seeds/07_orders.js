exports.seed = knex =>
  knex('orders')
    .del()
    .then(() =>
      // Inserts seed entries
      knex('orders').insert([
        {
          restaurant_id: 1,
          ndbno: '18064', // bread
          price: 100,
          quantity: 100,
        },
        {
          restaurant_id: 1,
          ndbno: '13317', // beef
          price: 100,
          quantity: 50,
        },
        {
          restaurant_id: 1,
          ndbno: '11251', // lettuce
          price: 50,
          quantity: 100,
        },
        {
          restaurant_id: 1,
          ndbno: '11529', // tomato
          price: 60,
          quantity: 50,
        },
        {
          restaurant_id: 1,
          ndbno: '01270', // cheese
          price: 40,
          quantity: 30,
        },
        {
          restaurant_id: 1,
          ndbno: '11233', // kale
          price: 60,
          quantity: 60,
        },
        {
          restaurant_id: 1,
          ndbno: '11205', // cucumber
          price: 30,
          quantity: 60,
        },
      ]),
    );
