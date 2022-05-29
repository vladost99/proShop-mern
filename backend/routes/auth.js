const {Router} = require('express');
const router = new Router();
const {login, getUserProfile, registerUser, updateUserProfile, getAllUser, deleteUser, getUseById, updateUser} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const UserContoroller = require('../controllers/userController1');


//router.post('/login', login);
//router.post('/register', registerUser);

router.post('/login', UserContoroller.login);
router.post('/register', UserContoroller.registration);
router.get('/refresh', UserContoroller.refresh);
router.post('/logout', UserContoroller.logout);
router.put('/profile', authMiddleware, UserContoroller.updateProfile);
router.get('/profile',authMiddleware, UserContoroller.getProfile);

router.get('/users', authMiddleware,adminMiddleware, getAllUser);
router.delete('/user/:id', authMiddleware, adminMiddleware,deleteUser);
router.get('/user/:id', authMiddleware, adminMiddleware, getUseById);
router.put('/user/:id', authMiddleware, adminMiddleware, updateUser);

module.exports = router;