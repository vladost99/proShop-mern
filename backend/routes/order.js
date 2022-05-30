const {Router} = require('express');
const router = new Router();
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const OrderController = require('../controllers/orderController');
const AdminController = require('../controllers/adminController');

router.post('/', authMiddleware, OrderController.createOrder);
router.get('/myorders',authMiddleware, OrderController.getMyOrders);
router.get('/:id', authMiddleware, OrderController.getOrderById);
router.put('/:id/pay',authMiddleware, OrderController.updateOrderToPaid);
router.get('/', authMiddleware, adminMiddleware, AdminController.getAllOrders);
router.put('/:id/delivered', authMiddleware, adminMiddleware, AdminController.updateOrderToDelivered);



module.exports = router;

