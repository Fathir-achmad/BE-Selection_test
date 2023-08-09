const router = require('express').Router();
const { absenController } = require('../controllers');
const { verifyToken } = require('../middleware/auth');


router.post('/in', verifyToken, absenController.clockIn)
router.patch('/out', verifyToken, absenController.clockOut)
router.get('/', verifyToken, absenController.arrival)
router.get('/history', verifyToken, absenController.history)



module.exports = router;