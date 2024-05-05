const mongoose = require('mongoose');
const cartSchema = mongoose.Schema({
    userId: { type: String, required: true },
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, required: true },
            quantity: { type: Number, default: 1 }
        }
    ]
});
module.exports = mongoose.model('cartsDB', cartSchema);