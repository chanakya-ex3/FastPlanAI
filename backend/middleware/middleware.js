const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


const middleware = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.user = decoded.user;
        next();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Token is not valid' });
    }
};

module.exports = middleware;