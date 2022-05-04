const tokensController = require('../controllers/tokens.controller');
const router = require('express').Router();

router.get('/', tokensController.tokens);

module.exports = router;
