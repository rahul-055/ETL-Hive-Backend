const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/db');
// const verifyToken = require('../models/verifytoken');

// Sign up
router.post('/signup', async (req, res) => {
    try {
        const { name, username, password } = req.body;
        const user = new User({ name, username, password });
        await user.save();
        res.status(201).json({ message: 'User created' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Sign in
router.post('/signin', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: '1h' });
        res.json({ token: token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
