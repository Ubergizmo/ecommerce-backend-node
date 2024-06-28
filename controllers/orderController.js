const orderSchema = require('../models/orderSchema')
exports.addOrder = async (req, res, next) => {
    try {
        const myOrder = new orderSchema({
            userId: req.body.userId,
            productList: req.body.productList,
            totalPrice: req.body.totalPrice,
            status: req.body.status
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
exports.oneUserOrder = async (req, res, next) => {
    try {
        const response = await orderSchema.find({ userId: req.params.userId, _id: req.params.id });
        if (!response) {
            return res.status(404).json({ message: "No order Found" })
        }
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.editOder = async (req, res, next) => {
    const updatedOrder = new orderSchema({
        ...req.body,
        _id: req.body._id
    });
    try {
        const response = await orderSchema.findByIdAndUpdate(req.params.id, updatedOrder);
        if (!response) {
            return res.status(404).json({ message: "No order Found" })
        }
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};