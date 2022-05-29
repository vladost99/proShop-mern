const jwt = require('jsonwebtoken');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const TokenService = require('../services/TokenService');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    )
    {
       try {
           token = req.headers.authorization.split(' ')[1];
           const decoded = TokenService.verifyToken(token);
           //console.log(decoded);
           req.user = await User.findById(decoded.id).select('-password');

           next();
       }
       catch(error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorization, token failed');
       }
    }

    if(!token) {
        res.status(401);
        throw new Error('Not authorization, no token');
    }
})

module.exports = protect;