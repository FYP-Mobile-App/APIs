const authSchema = require('../validations/auth.validation');
const authController = require('../controllers/auth.controller');
const router = require('express').Router();
const validate = require('../middlewares/validation.middleware');

router.post('/login', validate(authSchema.login), authController.login);

router.post('/phoneInUsersTable', authController.phoneInUsersTable);

router.post('/phoneInOTPTable', authController.phoneInOTPTable);

router.post('/signup', validate(authSchema.signup), authController.signup);

module.exports = router;
