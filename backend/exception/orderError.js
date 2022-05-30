module.exports = class ApiError extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static OrdersNotFound() {
        return new ApiError(404, 'Order items not found');
    }

    static OrderNotFound() {
        return new ApiError(404, 'Order not found');
    }

}