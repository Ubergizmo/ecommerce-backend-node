const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 2003;
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');
const userRoutes = require('./routes/userRoutes');
const mongoDB = 'mongodb://localhost:27017/applicationDB';
mongoose.connect(mongoDB)
    .then(() => console.info('Connected to mongoDB'))
    .catch((err) => console.error(err));
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use('/', productRoutes);
app.use('/', orderRoutes);
app.use('/', cartRoutes);
app.use('/', userRoutes);
app.get('/api', (req, res) => {
    res.send({ success: true });
});
app.listen(port, () => {
    console.log(`http://localhost:${port}/api`);
});