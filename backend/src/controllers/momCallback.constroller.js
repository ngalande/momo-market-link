const momoCallbackService = require('../services/momoCallback.service')

async function momoCallbackController(req, res, next) {
    try {
        res.json(await momoCallbackService.momocallback(req.body));
    } catch (err) {
        next(err);
    }
}

module.exports ={ 
    momoCallbackController
}