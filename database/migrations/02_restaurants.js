exports.up = knex =>
  knex.schema.createTable('restaurants', table => {
    table.increments('id').primary();
    table
      .string('restaurants_name')
      .unique()
      .notNullable();
    table
      .string('restaurant_address')
      .unique()
      .notNullable();
    table.string('restaurant_phone_number').notNullable();
    table.string('restaurant_website');
    table.timestamp('created_at');
    table.foreign('user_id').references('users.id');
  });

exports.down = knex => knex.schema.dropTableIfExists('recipes');
