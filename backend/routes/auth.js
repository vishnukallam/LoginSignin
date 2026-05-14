const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check if user exists
    const userExists = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Insert user
    const newUser = await db.query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id',
      [email, passwordHash]
    );

    res.status(201).json({ 
      message: 'Registration successful', 
      userId: newUser.rows[0].id 
    });
  } catch (err) {
    console.error('Registration Error:', err);
    res.status(500).json({ message: 'Zero-gravity failure (Server error)' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid coordinates (Invalid credentials)' });
    }

    const user = result.rows[0];

    // Check password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid coordinates (Invalid credentials)' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email
      }
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Zero-gravity failure (Server error)' });
  }
});

module.exports = router;
