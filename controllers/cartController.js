const cartSchema = require('../models/cartSchema');
exports.allCart = async (req, res, next) => {
    try {
        const response = await cartSchema.findOne({ userId: req.query.userId });
        if (!response || response.products.length === 0) {
            return res.status(404).json({ message: "Cart is empty" });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.addToCart = async (req, res, next) => {
    const myItem = new cartSchema({
        userId: req.params.userId,
        products: [
            ...products,
            {
                productId: req.params.productId,
                quantity: req.params.quantity
            }
        ]
    })
    try {
        await myItem.findOneAndUpdate();
        res.status(201).json('');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.editCart = async (req, res, next) => {
    try {
        const deletedProduct = await cartSchema.findByIdAndDelete(req.params.productId);
        if (!deletedProduct) {
            return res.status(404).json('Product does not exist in the cart');
        }
        res.status(201).json('The Product was deleted in the cart');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.deleteCart = async (req, res, next) => {
    try {
        await cartSchema.deleteMany({ userId: req.query.userId });
        res.status(201).json("Deleted all items in the Cart");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};