const ApiError = require('../exception/apiError');

module.exports = function (req, res, next) {
    if(req.user && req.user.isAdmin) {
       next();
    }
    else {
        next(ApiError.UnauthorizedError());
    } 
   
}

