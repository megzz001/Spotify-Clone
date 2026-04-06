const userModel = require('../models/user.model');
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function registerUser(req, res) {
    try {
        const { username, email, password , role = "user" } = req.body;
        const existingUser = await userModel.findOne({ 
            $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hash = await bcrypt.hash(password, 10);
        const user = await userModel.create({ username, email, password: hash, role });

        const token = jsonwebtoken.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET);
        res.cookie('token', token);
        res.status(201).json({ message: 'User registered successfully', user:{
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        } });
    } catch (error) {
        const isDbConnectivityError =
            error?.name === 'MongooseServerSelectionError' ||
            error?.name === 'MongoServerSelectionError' ||
            /SSL routines|Could not connect to any servers/i.test(error?.message || '');

        if (isDbConnectivityError) {
            return res.status(503).json({
                message: 'Database unavailable. Check MongoDB Atlas network access/whitelist and connection string.',
            });
        }

        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
}

async function loginUser(req, res) {
    try {
        const { username,email, password } = req.body;
        const user = await userModel.findOne({
            $or: [{ email }, { username }] });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = jsonwebtoken.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET);
        res.cookie('token', token);
        res.json({ message: 'Login successful', user:{
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        } });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Error logging in user', error: error.message });
    }
}

async function logoutUser(req, res) {
    res.clearCookie('token');
    res.json({ message: 'Logout successful' });
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser
};