const ApiError = require('../exception/apiError');

module.exports = function admin(req, res, next) {
    if(req.user && req.user.isAdmin) {
        next();
    }
    throw ApiError.UnauthorizedError();
}

