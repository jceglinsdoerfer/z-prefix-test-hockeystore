/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments('user_id');
    table.string('first_name', 250).notNullable;
    table.string('last_name', 250).notNullable;
    table.string('user_name', 250).notNullable;
    table.string('password').notNullable;
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
