/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user_items').del()
  await knex('user_items').insert([
    {item_id: 1, user_id: 3, quantity: 8},
    {item_id: 2, user_id: 2, quantity: 3},
    {item_id: 3, user_id: 1, quantity: 12},
  ]);
};
