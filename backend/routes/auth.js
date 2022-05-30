const {Router} = require('express');
const router = new Router();
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const UserContoroller = require('../controllers/userController');
const AdminController = require('../controllers/adminComtroller');




router.post('/login', UserContoroller.login);
router.post('/register', UserContoroller.registration);
router.get('/refresh', UserContoroller.refresh);
router.post('/logout', UserContoroller.logout);
router.put('/profile', authMiddleware, UserContoroller.updateProfile);
router.get('/profile',authMiddleware, UserContoroller.getProfile);

router.get('/users', authMiddleware,adminMiddleware, AdminController.getAllUsers);
router.delete('/user/:id', authMiddleware, adminMiddleware, AdminController.deleteUser);
router.get('/user/:id', authMiddleware, adminMiddleware, AdminController.getUserById);
router.put('/user/:id', authMiddleware, adminMiddleware, AdminController.updateUser);

module.exports = router;