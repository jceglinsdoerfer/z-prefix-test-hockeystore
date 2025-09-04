/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('items').del()
  await knex('items').insert([
    {item_name: 'Helmet', description: 'Protects the melon'},
    {item_name: 'Gloves', description: 'Protects the hands'},
    {item_name: 'Skates', description: 'Makes moving possible'}
  ]);
};
