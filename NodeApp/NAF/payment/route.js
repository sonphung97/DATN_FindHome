const express = require('express');
const router = express.Router();
const paymentController = require('./controller');
const { auth } = require('../../middleware');

router.get('/', auth, paymentController.getAllPayments);
router.post('/', auth, paymentController.createPayment);

module.exports = router;