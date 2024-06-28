//userController.js
const userSchema = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
exports.getUser = async (req, res, next) => {
    try {
        const response = await userSchema.findById(req.params.id);
        if (!response) {
            return res.status(404).json({ message: 'User does not exist' });
        }
        res.status(201).json(response.username);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.editUser = async (req, res, next) => {
    const updatedUser = new userSchema({
        _id: req.body._id,
        username: req.params.username,
        password: req.params.password
    })
    try {
        const response = await userSchema.findByIdAndUpdate(req.params.id, updatedUser);
        if (!response) {
            return res.status(404).json({ message: 'User does not exist' });
        }
        res.status(201).json('User sucefully updated');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.deleteUser = async (req, res, next) => {
    try {
        const response = await userSchema.findByIdAndDelete(req.params.id);
        if (!response) {
            return res.status(404).json({ message: 'User does not exist' });
        }
        res.status(201).json({ message: "User deleted" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.login = async (req, res, next) => {
    try {
        const response = await userSchema.findOne({ username: req.body.username });
        if (!response) {
            return res.status(404).json({ message: 'User does not exist' });
        }
        const passwordMatch = await bcrypt.compare(req.body.password, response.password);
        if (!passwordMatch) {
            return res.status(401).json({ auth: false, token: null, message: 'Wrong password' });
        }
        const token = jwt.sign({ userID: response._id }, 'RANDOM_TOKEN_SECRET', { expiresIn: '72h' });
        res.status(201).json({ message: "User connected", userID: response._id, token: token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.register = async (req, res, next) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const myUser = new userSchema({
        username: req.body.username,
        password: hashedPassword
    });
    try {
        await myUser.save();
        res.status(201).json({ message: "User created" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.logout = async (req, res, next) => {
    try {
        if (req.refreshToken) {
            await refreshTokenSchema.deleteMany({ token: req.refreshToken }).exec();
        }
        res.status(200).json({ message: "User deconnected" });
    } catch (error) {
        res.status(500).json({ error: "Failed to logout." });
    }
};
