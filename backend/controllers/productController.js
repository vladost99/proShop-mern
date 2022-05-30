const ProductService = require('../services/ProductService');

class ProductController {
    async getProducts(req,res,next) {
        try {
            const products = await ProductService.getProducts(req);
            res.json(products);
        }
        catch(e) {
            next(e);
        }
    }
    
    async getTopProducts(req,res,next) {
        try {
            const topProducts = await ProductService.getTopProducts();
            res.json(topProducts);
        }
        catch(e) {
            next(e);
        }
    }

    async getProductById(req,res, next) {
        try {
            const product = await ProductService.getProductById(req);
            res.json(product);
        }
        catch(e) {
            next(e);
        }
    }

    async createReview(req,res,next) {
        try {
           const updateProduct = await ProductService.createReview(req);
           res.json(updateProduct);
        }
        catch(e) {
            next(e);
        }
    }

}

module.exports = new ProductController();


