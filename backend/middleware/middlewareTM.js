const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/User');
dotenv.config();


const middlewareTM = async (req, res, next) => {
    // logger
    console.log("middlewareTM is calling");
    const token = req.header('Authorization');
    if (!token || token === 'null') {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.user = decoded.user;
        const user = await User.findById(req.body.user.id);
        console.log("user.role",user.role," is calling");
        if (user.role != "TM"){
            console.log("user.role",user.role," is calling");
            return res.status(401).json({ message: 'Invalid Role for This Endpoint' });
        }
        next();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Token is not valid' });
    }
};

module.exports = middlewareTM;