exports.seed = knex =>
  knex('inventory')
    .del()
    .then(() =>
      // Inserts seed entries
      knex('inventory').insert([
        {
          ndbno: '18064',
          inventory_name: 'Bread, wheat',
        },
        {
          ndbno: '13317',
          inventory_name: 'Beef, ground, patties, frozen, cooked, broiled',
        },
        {
          ndbno: '11251',
          inventory_name: 'Lettuce, cos or romaine, raw',
        },
        {
          ndbno: '11529',
          inventory_name: 'Tomatoes, red, ripe, raw, year round average',
        },
        {
          ndbno: '01270',
          inventory_name: 'Cheese, cheddar, sharp, sliced',
        },
        {
          ndbno: '11233',
          inventory_name: 'Kale, raw',
        },
        {
          ndbno: '11205',
          inventory_name: 'Cucumber, with peel, raw',
        },
      ]),
    );
