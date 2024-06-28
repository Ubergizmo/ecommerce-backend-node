//userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
router.get('/api/user/:id', userController.getUser);
router.put('/api/user/:id', userController.editUser);
router.delete('/api/user/:id', userController.deleteUser);
router.get('/api/auth/login', userController.login);
router.post('/api/auth/register', userController.register);
router.get('/api/auth/logout', userController.logout);
module.exports = router;