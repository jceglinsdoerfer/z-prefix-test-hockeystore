/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {user_id: 1, first_name: 'George', last_name: 'Lewis', user_name: 'g_lewis', password: '1234qwer'},
    {user_id: 2, first_name: 'Stephanie', last_name: 'Smith', user_name: 's_smith', password: 'asdf5678'},
    {user_id: 3, first_name: 'Vanya', last_name: 'Lalsing', user_name: 'v_lalsing', password: '0987poiu'}
  ]);
};
