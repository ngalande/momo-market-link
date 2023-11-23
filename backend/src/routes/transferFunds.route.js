const express = require('express');
const router = express.Router();
const {transferFundsController, getDisbursementTransactionStatusController} = require('../controllers/transferFunds.controller')

router.post('/confirmdelivery', transferFundsController);
// router.get('/getbalance', getAccountBalanceController);
router.get('/transferstatus', getDisbursementTransactionStatusController);


module.exports = router;