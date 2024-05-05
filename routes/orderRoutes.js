const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController')
router.get('/api/order', orderController.allOrder);
router.get('/api/order/:id', orderController.oneOrder);
router.post('/api/order', orderController.addOrder);
module.exports = router;