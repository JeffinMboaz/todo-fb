const User = require('../models/user');
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Fix splitting issue
    if (!token) return res.sendStatus(401); // Unauthorized

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
        if (err) return res.sendStatus(403); // Forbidden
        req.user = decodedUser; // Fix incorrect assignment
        console.log("User authenticated:", req.user);
        next();
    });
};

module.exports = authenticateToken;
