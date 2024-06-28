const cartSchema = require('../models/cartSchema');
exports.getCart = async (req, res, next) => {
    try {
        const response = await cartSchema.find({ userId: req.params.userId, _id: req.params.id });
        if (!response) {
            return res.status(404).json({ message: "Cart is empty" });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.addCart = async (req, res, next) => {
    const myItem = new cartSchema({
        userId: req.body.userId,
        products: [
            {
                productId: req.body.productId,
                quantity: req.body.quantity
            }
        ]
    });
    try {
        await myItem.save();
        res.status(201).json({ message: 'Cart created successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.editCart = async (req, res, next) => {
    const updatedCart = new cartSchema({
        _id: req.params.id,
        ...req.body,
    });
    try {
        const response = await cartSchema.findByIdAndUpdate(req.params.id, updatedCart);
        if (!response) {
            return res.status(404).json('Cart does not exist ');
        }
        res.status(201).json('The Product was added in the cart');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.deleteCart = async (req, res, next) => {
    try {
        const response = await cartSchema.findByIdAndDelete(req.params.id);
        if (!response) {
            return res.status(404).json('Cart does not exist');
        }
        res.status(201).json('The cart was deleted');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};