const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController')
router.get('/api/order', orderController.allOrder);
router.get('/api/order/:id', orderController.oneOrder);
router.get('/api/order/:userId/:id', orderController.oneUserOrder);
router.post('/api/order', orderController.addOrder);
router.put('/api/order/:id', orderController.editOder);
module.exports = router;