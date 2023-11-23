const {transferFunds, getDisbursementTransactionStatus, getAccountBalance} = require('../services/disbursement.service')


async function transferFundsController(req, res, next) {
    try {
        res.json(await transferFunds(req.body));
    } catch (err) {
        next(err);
    }
}

async function getDisbursementTransactionStatusController(req, res, next) {
    const referenceId = req.query.referenceId
    try {
        res.json(await getDisbursementTransactionStatus(referenceId));
    } catch (err) {
        next(err);
    }
}

// async function getAccountBalanceController(req, res, next) {
//     try {
//         res.json(await getAccountBalance());
//     } catch (err) {
//         next(err);
//     }
// }


module.exports = {
    transferFundsController,
    getDisbursementTransactionStatusController,
    // getAccountBalanceController
}