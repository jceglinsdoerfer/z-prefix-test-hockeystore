/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('items').del()
  await knex('items').insert([
    {items_id: 1, user_id: 3, item_name: 'Helmet', description: 'Protects the melon', quantity: 8},
    {items_id: 2, user_id: 2, item_name: 'Gloves', description: 'Protects the hands', quantity: 3},
    {items_id: 3, user_id: 1, item_name: 'Skates', description: 'Makes moving possible', quantity: 12}
  ]);
};
