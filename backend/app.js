const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8000;
const knex = require('knex')(require('./knexfile.js')['development']);
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'SECRET';

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.post('/hockeystore/login', async (req, res) => {
  const {user_name, password} = req.body;

  try {
    const user = await knex('users')
    .where({ user_name, password })
    .first();

    if(!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign(
      {
        user_id: user.user_id,
        user_name: user.user_name,
        first_name: user.first_name,
        last_name: user.last_name
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 24 * 60 *60 * 1000
    });

    res.status(200).json({
      message: 'Login successful',
      user: {
        user_id: user.user_id,
        user_name: user.first_name,
        last_name: user.last_name
      }
    });
  } catch (err) { 
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
});

app.post('/hockeystore/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout successful' });
});

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
    .where('user_id', req.params.userId)
    .then(data => res.status(200).json(data))
    .catch(err =>
      res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again'
      })
    );
});

app.post('/hockeystore/users', async (req, res) => {
  console.log('Received user data:', req.body);

  const { first_name, last_name, user_name, password } = req.body;

  try {
    console.log('Attempting to insert user into DB');

    const [newUser] = await knex('users')
      .insert({
        first_name,
        last_name,
        user_name,
        password // In real apps, hash this
      })
      .returning(['user_id', 'first_name', 'last_name', 'user_name']); // return inserted user

      console.log('Insert success:', newUser)

    res.status(201).json({
      message: 'User Created',
      user: newUser
    });
  } catch (err) {
    console.error('Error inserting user:', err);
    res.status(500).json({ error: 'Failed to create user' });
  }
});


app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});