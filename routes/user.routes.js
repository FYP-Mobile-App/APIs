const userController = require('../controllers/user.controller');
const router = require('express').Router();

router.get('/address', userController.address);

module.exports = router;
