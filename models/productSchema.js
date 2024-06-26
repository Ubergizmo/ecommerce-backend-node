const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
})
module.exports = mongoose.model('productsDB', productSchema)