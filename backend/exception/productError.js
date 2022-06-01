class ProductError extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
        this.message = message;
    }

    static productsNotFound() {
        return new ProductError(404, 'Product items not found');
    }

    static productNotFound() {
        return new ProductError(404, 'Product not found');
    }

    static productAlreadyReview() {
        return new ProductError(400, 'Product already reviewed');
    }

}


module.exports = ProductError;