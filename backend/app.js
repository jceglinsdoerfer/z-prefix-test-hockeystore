const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8000;
const knex = require('knex')(require('./knexfile.js')['development']);

app.use(express.json());
app.use(cors());

app.get('/hockeystore/users', async function(req, res) {
  await knex('users')
    .select('*')
    .then(data => res.status(200).json(data))
    .catch(err =>
      res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again'
      })
    );
});

app.get('/hockeystore/items', async function(req, res) {
  await knex('items')
    .select('*')
    .then(data => res.status(200).json(data))
    .catch(err =>
      res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again'
      })
    );
});

app.get('/hockeystore/useritems/:userId', async function(req, res) {
  await knex('user_items')
    .select('*')
    .whereRaw(`user_id = ${req.params.userId}`)
    .then(data => res.status(200).json(data))
    .catch(err =>
      res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again'
      })
    );
});

app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});