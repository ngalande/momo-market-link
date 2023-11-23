const requestToPayService = require('../services/requestToPay.service')

async function requestToPayController(req, res, next) {
    try {
        res.json(await requestToPayService.requestToPay(req.body));
    } catch (err) {
        next(err);
    }
}

module.exports ={ 
    requestToPayController
}