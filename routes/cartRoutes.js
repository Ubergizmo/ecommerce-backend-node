const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
router.get('/api/cart/:userId/:id', cartController.getCart);
router.post('/api/cart', cartController.addCart);
router.put('/api/cart/:id', cartController.editCart);
router.delete('/api/cart/:id', cartController.deleteCart);
module.exports = router;