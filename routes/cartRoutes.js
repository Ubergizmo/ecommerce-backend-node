const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
router.get('/api/cart', cartController.allCart);
router.put('/api/cart', cartController.addToCart);
router.put('/api/cart/:productId', cartController.editCart);
router.delete('/api/cart', cartController.deleteCart);
module.exports = router;