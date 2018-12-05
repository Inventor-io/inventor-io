exports.up = knex =>
  knex.schema
    // 01 RESTAURANTS
    .createTable('restaurants', table => {
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
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.string('user_id'); // foreign('user_id').references('users.id');
    })

    // 02 RECIPES
    .createTable('recipes', table => {
      table.increments('recipe_id');
      table
        .integer('restaurant_id')
        .references('id')
        .inTable('restaurants');
      table
        .string('recipe_name')
        .unique() // TODO: delete.... other restaurants/users should be allowed to have same recipe names
        .notNullable();
      table.float('price', 8, 2);
      table.boolean('deleted').defaultTo(false);
    })

    // 03 INVENTORY
    .createTable('inventory', table => {
      table.string('ndbno').unique();
      table.string('inventory_name');
    })

    // 04 RESTAURANT-INVENTORY JOINT TABLE
    .createTable('restaurant_inventory', table => {
      table.increments('id');
      table
        .integer('restaurant_id')
        .references('id')
        .inTable('restaurants');
      table
        .string('ndbno')
        .references('ndbno')
        .inTable('inventory');
      table.float('quantity').defaultTo(0);
    })

    // 05 RECIPE-INVENTORY JOIN TABLE
    .createTable('recipe_inventory', table => {
      table.increments('id');
      table
        .integer('recipe_id')
        .references('recipe_id')
        .inTable('recipes');
      table
        .string('ndbno')
        .references('ndbno')
        .inTable('inventory');
      table.float('measurement').defaultTo(0);
    })

    // 06 SALES
    .createTable('sales', table => {
      table.increments('id');
      table
        .integer('recipe_id')
        .references('recipe_id')
        .inTable('recipes');
      table
        .integer('restaurant_id')
        .references('id')
        .inTable('restaurants');
      table.float('quantity').defaultTo(0);
      table.timestamp('date').defaultTo(knex.fn.now());
    })

    // 07 HISTORICAL ORDERS
    .createTable('orders', table => {
      table.increments('id');
      table
        .integer('restaurant_id')
        .references('id')
        .inTable('restaurants');
      table
        .string('ndbno')
        .references('ndbno')
        .inTable('inventory');
      table.float('price', 10, 2);
      table.float('quantity');
      table.timestamp('date').defaultTo(knex.fn.now());
      table.boolean('delivered').defaultTo(false);
    });

exports.down = knex =>
  knex.schema
    .dropTableIfExists('orders')
    .dropTableIfExists('sales')
    .dropTableIfExists('recipe_inventory')
    .dropTableIfExists('restaurant_inventory')
    .dropTableIfExists('inventory')
    .dropTableIfExists('recipes')
    .dropTableIfExists('restaurants');
