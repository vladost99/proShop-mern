const {Router} = require('express');
const router = new Router();
const {getProducts, getProductById, deleteProduct, updateProduct, createProduct, createProductReview, getTopProducts} = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

router.get('/', getProducts);
router.get('/:id/detail', getProductById);
router.delete('/:id', authMiddleware, adminMiddleware, deleteProduct);
router.put('/:id', authMiddleware, adminMiddleware, updateProduct);
router.post('/create', authMiddleware ,adminMiddleware, createProduct);
router.post('/:id/reviews', authMiddleware, createProductReview);
router.get('/top', getTopProducts);

module.exports = router;