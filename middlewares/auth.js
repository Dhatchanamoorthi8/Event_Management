const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticate = (req, res, next) => {

    const authHeader = req.headers.authorization;


    if (authHeader && authHeader.startsWith('Bearer ')) {

        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.sendStatus(403); // Invalid token
            }
            req.user = await User.findById(decoded.id);
            next();
        });
    } else {
        res.sendStatus(401); // No token provided
    }
};

module.exports = authenticate;
