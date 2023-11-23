const express = require('express');
const router = express.Router();
const getSellerBuyerTransactionsController = require('../controllers/getSellerBuyerTransactions.controller')

router.post('/', getSellerBuyerTransactionsController.getSellerBuyerTransactionsController);


module.exports = router;