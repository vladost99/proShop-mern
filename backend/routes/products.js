const {Router} = require('express');
const router = new Router();
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const ProductController = require('../controllers/productController');
const AdminController = require('../controllers/adminController');

router.get('/', ProductController.getProducts);
router.get('/:id/detail', ProductController.getProductById);
router.get('/top', ProductController.getTopProducts);
router.post('/:id/reviews', authMiddleware, ProductController.createReview);

router.delete('/:id', authMiddleware, adminMiddleware, AdminController.deleteProduct);
router.put('/:id', authMiddleware, adminMiddleware, AdminController.updateProduct);
router.post('/create', authMiddleware ,adminMiddleware, AdminController.createProduct);


module.exports = router;