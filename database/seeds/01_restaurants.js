exports.seed = knex =>
  knex('restaurants')
    .del()
    .then(() =>
      // Inserts seed entries
      knex('restaurants').insert([
        {
          restaurants_name: 'the good place',
          restaurant_address: 'address1',
          restaurant_phone_number: '555-555-5555',
          restaurant_website: 'http://thegoodplace.com',
          user_id: 1,
        },
        {
          restaurants_name: 'el ranchero',
          restaurant_address: 'address2',
          restaurant_phone_number: '555-555-1111',
          restaurant_website: 'http://elranchero.com',
          user_id: 1,
        },
        {
          restaurants_name: 'burger king',
          restaurant_address: 'address3',
          restaurant_phone_number: '555-555-2222',
          restaurant_website: 'http://thegoodplace.com',
          user_id: 2,
        },
        {
          restaurants_name: 'north italy',
          restaurant_address: 'address4',
          restaurant_phone_number: '555-555-3333',
          restaurant_website: 'http://elranchero.com',
          user_id: 3,
        },
      ]),
    );
