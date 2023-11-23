const express = require('express');
const router = express.Router();
const getAccountBalanceController = require('../controllers/getAccountBalance.controller')

router.get('/', getAccountBalanceController.getAccountBalanceController);


module.exports = router;