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
  const { user_name, password } = req.body;

  try {
    const user = await knex('users')
      .where({ user_name, password })
      .first();

    if (!user) {
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
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      message: 'Login successful',
      user: {
        user_id: user.user_id,
        user_name: user.user_name,
        first_name: user.first_name,
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

app.get('/hockeystore/users', async function (req, res) {
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

app.get('/hockeystore/items', async function (req, res) {
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

app.get('/hockeystore/useritems/:userId', async function (req, res) {
  try {
    const data = await knex('user_items')
      .join('items', 'user_items.item_id', '=', 'items.items_id')
      .where('user_items.user_id', req.params.userId)
      .select(
        'user_items.item_id',
        'user_items.quantity',
        'items.item_name',
        'items.description'
      );
    res.status(200).json(data);
  } catch (err) {
    console.error('Error fetching user items:', err);
    res.status(404).json({
      message: 'The data you are looking for could not be found. Please try again'
    });
  }
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
        password
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

app.post('/hockeystore/items', async (req, res) => {
  console.log('Received item data:', req.body);

  const { item_name, description } = req.body;

  try {
    console.log('Attempting to insert item into DB');

    const [newItem] = await knex('items')
      .insert({
        item_name,
        description

      })
      .returning(['items_id', 'item_name', 'description']);

    console.log('Insert success:', newItem)

    res.status(201).json({
      message: 'Item Created',
      items: newItem
    });
  } catch (err) {
    console.error('Error inserting item:', err);
    res.status(500).json({ error: 'Failed to add item' });
  }
});

app.put('/hockeystore/items/:id', async (req, res) => {
  console.log('Received update data:', req.body);

  const { id } = req.params;
  const { item_name, description } = req.body;

  try {
    console.log(`Attempting to update item with ID: ${id}`);

    const updatedItems = await knex('items')
      .where({ items_id: id })
      .update({
        item_name,
        description

      })
      .returning(['items_id', 'item_name', 'description']);

    console.log('Update success:', updatedItems[0]);

    res.status(200).json({
      message: 'Item Updated',
      items: updatedItems[0]
    });
  } catch (err) {
    console.error('Error updating item:', err);
    res.status(500).json({ error: 'Failed to update item' });
  }
});

app.delete(`/hockeystore/items/:id`, async (req, res) => {

  const { id } = req.params;

  try {
    const deleteItem = await knex('items').where('items_id', id).first();

    if (!deleteItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    await knex('items').where('items_id', id).del();

    res.status(200).json({
      message: 'Item Deleted',
      deletedItem: deleteItem
    });
  } catch (err) {
    console.error('Error deleting item:', err);
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

app.get('/hockeystore/auth/check', (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.status(200).json({
      authenticated: true,
      user: {
        user_id: decoded.user_id,
        user_name: decoded.user_name,
        first_name: decoded.first_name,
        last_name: decoded.last_name
      }
    });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

app.post('/hockeystore/useritems', async (req, res) => {
  const { user_id, item_id, quantity } = req.body;

  try {
    const existingItem = await knex('user_items')
      .where({ user_id, item_id })
      .first();

    if (existingItem) {
      await knex('user_items')
        .where({ user_id, item_id })
        .update({ quantity: existingItem.quantity + quantity });

      res.status(200).json({
        message: 'Item quantity updated',
        user_id,
        item_id,
        new_quantity: existingItem.quantity + quantity
      });
    } else {
      await knex('user_items')
        .insert({ user_id, item_id, quantity });

      res.status(201).json({
        message: 'Item added to user inventory',
        user_id,
        item_id,
        quantity
      })
    }

  } catch (err) {
    console.error('Error adding/updating user item:', err);
    res.status(500).json({ error: 'Failed to add/update item' });
  }
});


app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});