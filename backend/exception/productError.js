module.exports = class ApiError extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static productsNotFound() {
        return new ApiError(404, 'Product items not found');
    }

    static productNotFound() {
        return new ApiError(404, 'Product not found');
    }

    static productAlreadyReview() {
        return new ApiError(400, 'Product already reviewed');
    }

}