// Mock auth.js routes for local frontend testing without a live database or network issues
const express = require('express');
const router = express.Router();

// In-memory array to temporarily store users while testing locally
const mockUsers = [];

// SIGNUP ROUTE
router.post('/signup', async (req, res) => {
  try {
    const { email, password, role, name } = req.body;

    // Check if user already exists in our mock array
    const existingUser = mockUsers.find((u) => u.email === email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Create a mock user object
    const newUser = {
      id: Date.now().toString(), // Mock unique ID
      name,
      email,
      role: role || 'CLIENT',
    };

    mockUsers.push(newUser);

    // Simulate successful registration and return a dummy token
    return res.status(201).json({
      message: 'Mock signup successful!',
      token: 'mock-jwt-token-12345',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    return res.status(500).json({ error: 'Server error during signup' });
  }
});

// SIGNIN ROUTE
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = mockUsers.find((u) => u.email === email);
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    return res.status(200).json({
      message: 'Mock signin successful!',
      token: 'mock-jwt-token-12345',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(500).json({ error: 'Server error during signin' });
  }
});

module.exports = router;