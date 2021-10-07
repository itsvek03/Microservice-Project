const models = require('../models');
const axios = require('axios')


exports.getProductPrice = async (req, res) => {
    try {
        let { sku } = req.params;
        const getPriceDetails = await models.priceProduct.findOne({
            where: {
                product_sku: sku
            }
        })
        if (!getPriceDetails) {
            return res.status(200).json({ message: 'Product not found' })
        }
        return res.status(200).json({ data: getPriceDetails })
    } catch (err) {
        return res.status(500).json({ message: "Something went wrong" })
    }
}