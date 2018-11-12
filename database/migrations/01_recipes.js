exports.up = function(knex) {
  return knex.schema.createTable('recipes', table => {
    table.increments();
    table
      .string('recipe_name')
      .unique()
      .notNullable();
  });
};

exports.down = function(knex) {
  console.log('TEARING IT DOWN');
  return knex.schema.dropTableIfExists('recipes');
};
