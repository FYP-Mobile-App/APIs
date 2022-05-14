const authSchema = require('../validations/auth.validation');
const authController = require('../controllers/auth.controller');
const router = require('express').Router();
const validate = require('../middlewares/validation.middleware');

router.post('/login', validate(authSchema.login), authController.login);

router.post('/register/otp', authController.registerOTP);

router.post('/register/submitotp', authController.registerPhoneAndOTP);

router.post('/register', validate(authSchema.signup), authController.register);

router.post('/forget/otp', authController.forgetOTP);

router.post('/forget/submitotp', authController.forgetPhoneAndOTP);

router.post('/forget', authController.forget);

module.exports = router;
