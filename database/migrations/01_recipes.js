exports.up = knex =>
  knex.schema.createTable('recipes', table => {
    table.increments('recipe_id');
    table.integer('restuarant_id');
    //   .references('id')
    //   .inTable('restaurants');
    table
      .string('recipe_name')
      .unique()
      .notNullable();
    table.float('price', 8, 2);
  });

exports.down = knex => knex.schema.dropTableIfExists('recipes');
