const {Router} = require('express');
const router = new Router();
const {addOrderItems, getOrderById, updateOrderToPaid, getMyOrder, getAllOrders, updateOrderToDelivered} = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware'); 

router.post('/', authMiddleware, addOrderItems);
router.get('/myorders',authMiddleware, getMyOrder);
//router.get('/allorders', getAllOrders);
router.get('/:id', authMiddleware, getOrderById);
router.put('/:id/pay',authMiddleware, updateOrderToPaid);
router.get('/', authMiddleware, adminMiddleware, getAllOrders);
router.put('/:id/delivered', authMiddleware, adminMiddleware, updateOrderToDelivered);



module.exports = router;

