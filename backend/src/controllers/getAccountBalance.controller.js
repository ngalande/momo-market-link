const getAccountBalanceService = require('../services/getAccountBalance.service')

async function getAccountBalanceController(req, res, next) {
    try {
        res.json(await getAccountBalanceService.getAccountBalance());
    } catch (err) {
        next(err);
    }
}

module.exports ={ 
    getAccountBalanceController
}