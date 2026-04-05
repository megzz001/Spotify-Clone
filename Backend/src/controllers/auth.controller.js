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
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
}

module.exports = {
    registerUser,
};