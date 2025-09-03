/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('items').del()
  await knex('items').insert([
    {items_id: 1, item_name: 'Helmet', description: 'Protects the melon'},
    {items_id: 2, item_name: 'Gloves', description: 'Protects the hands'},
    {items_id: 3, item_name: 'Skates', description: 'Makes moving possible'}
  ]);
};
