//auth.js
const jwt = require('jsonwebtoken');

exports.auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userID = decodedToken.userID;
        req.auth = {
            userID: userID
        };
        next();
    } catch (error) {
        res.status(401).json({ error });
    }
};