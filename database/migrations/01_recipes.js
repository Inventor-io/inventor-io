exports.up = knex =>
  knex.schema
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
      table.timestamp('created_at');
      // table.foreign('user_id').references('users.id');
    })

    // RECIPES
    .createTable('recipes', table => {
      table.increments('recipe_id');
      table
        .integer('restaurant_id')
        .references('id')
        .inTable('restaurants');
      table
        .string('recipe_name')
        .unique()
        .notNullable();
      table.float('price', 8, 2);
    })

    // INVENTORY
    .createTable('inventory', table => {
      table.integer('ndbno').unique();
      table.string('inventory_name');
    })

    // RESTAURANT-INVENTORY JOINT TABLE
    .createTable('restaurant_inventory', table => {
      table.increments('id');
      table
        .integer('restaurant_id')
        .references('id')
        .inTable('restaurants');
      table
        .integer('ndbno')
        .references('ndbno')
        .inTable('inventory');
      table.float('quantity').defaultTo(0);
    })

    // RECIPE-INVENTORY JOINT TABLE
    .createTable('recipe_inventory', table => {
      table.increments('id');
      table
        .integer('restaurant_id')
        .references('id')
        .inTable('restaurants');
      table
        .integer('ndbno')
        .references('ndbno')
        .inTable('inventory');
      table.float('measurement').defaultTo(0);
    })

    // SALES
    .createTable('sales', table => {
      table.increments('id');
      table
        .integer('recipe_id')
        .references('recipe_id')
        .inTable('recipes');
      table.float('quantity').defaultTo(0);
      table.timestamp('date').defaultTo(knex.fn.now());
    })

    // HISTORICAL ORDERS
    .createTable('orders', table => {
      table.increments('id');
      table
        .integer('ndbno')
        .references('ndbno')
        .inTable('inventory');
      table.float('price');
      table.float('quantity');
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
