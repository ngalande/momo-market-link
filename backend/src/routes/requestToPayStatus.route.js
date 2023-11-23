const express = require('express');
const router = express.Router();
const requestToPayStatusController = require('../controllers/requestToPay.controllerStatus')

router.get('/', requestToPayStatusController.requestToPayStatusController);


module.exports = router;