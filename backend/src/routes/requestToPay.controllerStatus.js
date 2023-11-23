const requestToPayStatusService = require('../services/requestToPayStatus.service')

async function requestToPayStatusController(req, res, next) {
    try {
        res.json(await requestToPayStatusService.requestToPayStatus(req.query));
    } catch (err) {
        next(err);
    }
}

module.exports ={ 
    requestToPayStatusController
}