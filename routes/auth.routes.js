const authSchema = require('../validations/auth.validation');
const authController = require('../controllers/auth.controller');
const router = require('express').Router();
const validate = require('../middlewares/validation.middleware');

router.post('/login', validate(authSchema.login), authController.login);

router.post('/phone', authController.phone);

router.post('/phoneAndOTP', authController.phoneAndOTP);

router.post('/signup', validate(authSchema.signup), authController.signup);

module.exports = router;
