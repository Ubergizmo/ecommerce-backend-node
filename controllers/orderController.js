const orderSchema = require('../models/productSchema')
exports.addOrder = async (req, res, next) => {
    try {
        const myOrder = new orderSchema({
            userId: req.params.userId,
            productList: req.params.productList,
            totalPrice: req.params.totalPrice,
            status: req.params.status
        })
        await myOrder.save();
        res.status(201).json({ message: 'Order added successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.allOrder = async (req, res, next) => {
    try {
        const response = await orderSchema.find();
        if (!response) {
            return res.status(404).json({ message: "No order Found" })
        }
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
exports.oneOrder = async (req, res, next) => {
    try {
        const response = await orderSchema.findById(req.params.id);
        if (!response) {
            return res.status(404).json({ message: "No order Found" })
        }
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};