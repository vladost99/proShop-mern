const Product = require('../models/product');
const ApiError = require('../exception/apiError');
const ProductError = require('../exception/productError');

class ProductService {
   async getProducts(req) {
       try {
        const pageSize = 8;
        const page = Number(req.query.pageNumber) || 1; 
        const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
        } : {}


        const count = await Product.count({...keyword});
        const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page - 1));
        return { page, pages: Math.ceil(count / pageSize), products};
       }
       catch(e) {
            throw ApiError.BadRequest();
       }
   }

   async getTopProducts() {
    try {
        const products = await Product.find({}).sort({ rating: -1}).limit(3);
        return products;
    }

    catch(e) {
        throw ApiError.BadRequest();
    }
   }

   async getProductById(req) {
    try {
        const product = await Product.findById(req.params.id);

        if(!product) throw ProductError.productNotFound()

        return product
    }
    catch(e) {
        throw ApiError.BadRequest();
    }
   }

   async createReview(req) {
       try {
        const {rating, comment} = req.body;

        const product = await Product.findById(req.params.id);

        if(!product) throw ProductError.productNotFound();

  
        const alreadyReviewd = product.reviews.find(r => r.user.toString() === req.user._id.toString());
      
        if(alreadyReviewd) throw ProductError.productAlreadyReview()
       

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        product.reviews.push(review);

        product.numReviews = product.reviews.length;

        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

        await product.save();
        return product;

       }
       catch(e) {
           throw ApiError.BadRequest()
       }
   }
}


module.exports = new ProductService();