const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
    userId: { type: String, required: true },
    productList: [{
        productId: { type: mongoose.Schema.Types.ObjectId },
        quantity: { type: Number, required: true }
    }],
    totalPrice: { type: Number, default: 0 },
    status: { type: String }
})
module.exports = mongoose.model('ordersDB', orderSchema)