const express = require('express');
const router = express.Router();
const {requestToPayController, getTransactionStatusController, getAllBuyerTransactionsController, getAllSellerTransactionsController, getActiveTransactionsController, getAllTransactionsController, getMostFrequentLocationController, getDebitedAmountsController, getCreditedAmountController, getCommissionController, assignDeliveryController, getAccountBalanceController, getAllDelivererTransactionsController} = require('../controllers/requestToPay.controller')

router.post('/requesttopay', requestToPayController);
router.get('/transactionstatus', getTransactionStatusController);
router.get('/getallsellertransactions', getAllSellerTransactionsController);
router.get('/getallbuyertransactions', getAllBuyerTransactionsController);
router.get('/getalldeliverertransactions', getAllDelivererTransactionsController);
router.get('/getactivetransactions', getActiveTransactionsController);
router.get('/getalltransactions', getAllTransactionsController);
router.get('/getfrequentlocation', getMostFrequentLocationController);
router.get('/getcreditedamounts', getCreditedAmountController);
router.get('/getdebitedamounts', getDebitedAmountsController);
router.get('/getcommission', getCommissionController);
router.post('/assigndelivery', assignDeliveryController);
router.get('/getbalance', getAccountBalanceController);


module.exports = router;