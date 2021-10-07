const express = require('express');
const router = express.Router();
const priceController = require('../controller/priceController')

router.get('/price/:sku', priceController.getProductPrice)

module.exports = router;