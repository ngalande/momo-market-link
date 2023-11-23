const {requestToPay, getTransactionStatus, getAllBuyerTransactions, getAllSellerTransactions, getActiveTransaction, getAllTransactions, getMostFrequentLocation, getCreditedAmounts, getDebitedAmounts, getTotalCommisions, AssignDelivery, getAccountBalance, getAllDelivererTransactions} = require('../services/requestToPay.service')

async function requestToPayController(req, res, next) {
    try {
        res.json(await requestToPay(req.body));
    } catch (err) {
        next(err);
    }
}

async function getTransactionStatusController(req, res, next) {
    const referenceId = req.query.referenceId;
    try {
        res.json(await getTransactionStatus(referenceId));
    } catch (err) {
        next(err);
    }
}

async function getAllBuyerTransactionsController(req, res, next) {
    const uid = req.query.uid;
    try {
        res.json(await getAllBuyerTransactions(uid));
    } catch (err) {
        next(err);
    }
}

async function getActiveTransactionsController(req, res, next) {
    try {
        res.json(await getActiveTransaction());
    } catch (err) {
        next(err);
    }
}

async function getAllTransactionsController(req, res, next) {
    try {
        res.json(await getAllTransactions());
    } catch (err) {
        next(err);
    }
}
async function getMostFrequentLocationController(req, res, next) {
    try {
        res.json(await getMostFrequentLocation());
    } catch (err) {
        next(err);
    }
}

async function getDebitedAmountsController(req, res, next) {
    try {
        res.json(await getDebitedAmounts());
    } catch (err) {
        next(err);
    }
}

async function getCreditedAmountController(req, res, next) {
    try {
        res.json(await getCreditedAmounts());
    } catch (err) {
        next(err);
    }
}

async function getCommissionController(req, res, next) {
    try {
        res.json(await getTotalCommisions());
    } catch (err) {
        next(err);
    }
}

async function getAllSellerTransactionsController(req, res, next) {
    const uid = req.query.uid;
    try {
        res.json(await getAllSellerTransactions(uid));
    } catch (err) {
        next(err);
    }
}

async function getAllDelivererTransactionsController(req, res, next) {
    const uid = req.query.uid;
    try {
        res.json(await getAllDelivererTransactions(uid));
    } catch (err) {
        next(err);
    }
}

async function assignDeliveryController(req, res, next) {
    try {
        res.json(await AssignDelivery(req.body));
    } catch (err) {
        next(err);
    }
}

async function getAccountBalanceController(req, res, next) {
    try {
        res.json(await getAccountBalance());
    } catch (err) {
        next(err);
    }
}

module.exports ={ 
    requestToPayController,
    getTransactionStatusController,
    getAllBuyerTransactionsController,
    getAllSellerTransactionsController,
    getAllDelivererTransactionsController,
    getActiveTransactionsController,
    getAllTransactionsController,
    getMostFrequentLocationController,
    getDebitedAmountsController,
    getCreditedAmountController,
    getCommissionController,
    assignDeliveryController,
    getAccountBalanceController
}