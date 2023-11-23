const getSellerBuyerTransactionsService = require('../services/getSellerBuyerTransactions.service')

async function getSellerBuyerTransactionsController(req, res, next) {
    try {
        res.json(await getSellerBuyerTransactionsService.getSellerBuyerTransactions(req.body));
    } catch (err) {
        next(err);
    }
}

module.exports ={ 
    getSellerBuyerTransactionsController
}