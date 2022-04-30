const tokensController = require('../controllers/tokens.controller');
const router = require('express').Router();

router.get('/', tokensController.addresses);

module.exports = router;
