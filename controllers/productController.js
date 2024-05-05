const productSchema = require('../models/productSchema');
exports.addProduct = async (req, res, next) => {
    const myProduct = new productSchema({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
    })
    try {
        await myProduct.save();
        res.status(201).json({ message: 'Product added added' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.allProduct = async (req, res, next) => {
    try {
        const response = await productSchema.find()
        !response ?
            res.status(404).json({ message: "No products found" }) :
            res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.oneProduct = async (req, res, next) => {
    try {
        const response = await productSchema.findById(req.params.id);
        !response ?
            res.status(404).json("Product does not exist") :
            res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.editProduct = async (req, res, next) => {
    const myProduct = new productSchema({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
    })
    try {
        const updatedProduct = await productSchema.findByIdAndUpdate(req.params.id, myProduct);
        if (!updatedProduct) {
            return res.status(404).json('Product does not exist');
        }
        res.status(201).json('The Product was edited');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.deleteProduct = async (req, res, next) => {
    try {
        const deletedProduct = await productSchema.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json('Product does not exist');
        }
        res.status(201).json('The Product was deleted');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.queryCategory = async (req, res, next) => {
    try {
        const response = await productSchema.find({ category: req.params.category });
        !response ?
            res.status(404).send(`No products found`) :
            res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.searchProduct = async (req, res, next) => {
    try {
        const { name, price } = req.query;
        const query = {};
        if (name) {
            query.name = { $regex: name, $options: 'i' };
        }
        if (price) {
            query.price = price;
        }
        const response = await productSchema.find(query);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};