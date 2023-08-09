const router = require('express').Router();
const { authController } = require('../controllers');
const { verifyToken } = require('../middleware/auth');
const { checkRegister, checkLogin, checkForgotPass, checkResetPass, checkKeepLogin, checkAddWorker } = require('../middleware/authValidator');
const { multerUpload } = require('../middleware/multer')

router.post('/addWorker', checkAddWorker,  authController.addWorker)
router.post('/', verifyToken, checkRegister, authController.register)
router.post('/login', checkLogin, authController.login)
router.get('/', checkKeepLogin, verifyToken, authController.keeplogin)
router.post('/', checkForgotPass, authController.forgetPassword)
router.patch('/', checkResetPass, verifyToken, authController.resetPassword)
router.get('/employee', verifyToken, authController.getEmployee)
router.post('/avatar', verifyToken, multerUpload().single('file') , authController.addAvatar);






module.exports = router;