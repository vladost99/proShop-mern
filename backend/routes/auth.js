const {Router} = require('express');
const router = new Router();
const {login, getUserProfile, registerUser, updateUserProfile, getAllUser, deleteUser, getUseById, updateUser} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');



router.post('/login', login);
router.get('/users', authMiddleware,adminMiddleware, getAllUser);
router.post('/register', registerUser);
router.put('/profile', authMiddleware, updateUserProfile);
router.get('/profile',authMiddleware, getUserProfile);
router.delete('/user/:id', authMiddleware, adminMiddleware,deleteUser);
router.get('/user/:id', authMiddleware, adminMiddleware, getUseById);
router.put('/user/:id', authMiddleware, adminMiddleware, updateUser);

module.exports = router;