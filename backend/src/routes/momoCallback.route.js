const express = require('express');
const router = express.Router();
const momoCallbackController = require('../controllers/momCallback.constroller')

router.post('/', momoCallbackController.momoCallbackController);


module.exports = router;