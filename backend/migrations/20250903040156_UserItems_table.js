/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('user_items', table => {
    table.integer('user_id').notNullable().references('user_id').inTable('users');
    table.integer('item_id').notNullable().references('items_id').inTable('items');
    table.integer('quantity').defaultTo(0);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('user_items');
};
