const express = require('express');
const router = express.Router();
const stockController = require('../controller/stockController')

router.get('/stock/:sku', stockController.getProductStock)

router.patch('/stock/:sku/:country', stockController.updateStockProduct)

module.exports = router;