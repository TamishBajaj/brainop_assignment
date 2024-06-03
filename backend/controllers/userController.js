const jwt = require('jsonwebtoken');
const User = require('../models/User')
require('dotenv').config()

const registerUser = async (req, res) => {
    const { username, email, password, name, profilePicture } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please enter all fields' });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
        username,
        email,
        password,
        name,
        profilePicture
    });

    const token = jwt.sign({ id: user._id }, process.env.secretKey, { expiresIn: '30d' });
    res.status(201).json({ message: 'User registered', token });
}



const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        const token = jwt.sign({ id: user._id }, process.env.secretKey, { expiresIn: '30d' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
}

module.exports = { registerUser, loginUser };