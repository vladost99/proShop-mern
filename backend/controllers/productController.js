const Product = require('../models/product');
const asyncHandler = require('express-async-handler');
const storageService = require('../services/StorageService');

const getProducts = asyncHandler(async(req, res) => {
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
    res.json({ page, pages: Math.ceil(count / pageSize), products});
});


const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1}).limit(3);
 // console.log('products',products);
  res.json(products);
});

const getProductById = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id);

    if(product) {
      res.json(product);
    }
    else {
      res.status(404);
      throw new Error('Product not found')
    }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if(product) {
    await product.remove();
    res.json({message: 'Product removed'});
  }
  else {
    product.status(404);
    throw new Error('Product not found');
  }
});

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/image/sample.jpg',
    brand: 'Sample Brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description'
  });

  const createProduct = await product.save();
  res.status(201).json(createProduct);
});


const updateProduct = asyncHandler(async (req, res) => {
  const {name, price, description, image, brand, category, countInStock} = req.body;
  const product = await Product.findById(req.params.id);

  if(product) {
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.image = image && image !== '/image/sample.jpg' ? await storageService.upload(req.params.id,image) : product.image;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.countInStock = countInStock || product.countInStock;

    const updateProduct = await product.save();

    res.json(updateProduct);
  }

  else {
    res.status(404);
    throw new Error('Product not found');
  }


});


const createProductReview = asyncHandler(async (req, res) => {
  const {rating, comment} = req.body;

  const product = await Product.findById(req.params.id);

  if(product) {
      const alreadyReviewd = product.reviews.find(r => r.user.toString() === req.user._id.toString());
      if(alreadyReviewd) {
        res.status(400)
        throw new Error('Product already reviewed');
      }

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
      res.status(201).json({message: 'Review added'});

  } else {
    res.status(401);
    throw new Error('Product not found');
  }

});






module.exports = {
    getProductById,
    getProducts,
    deleteProduct,
    updateProduct,
    createProduct,
    createProductReview,
    getTopProducts
}