const router = require('express').Router();
const { positionController } = require("../controllers");
const { verifyToken } = require("../middleware/auth");


router.get('/',verifyToken, positionController.getPosition)
router.get('/salary',verifyToken, positionController.calculateSalary)

module.exports = router;