module.exports = class ApiError extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new ApiError(401, 'The user is not authorized')
    }

    static UserNotFound(){
        return new ApiError(404, 'User not found');
    }

    static OrdersNotFound() {
        return new ApiError(404, 'Order items not found');
    }

    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }
}