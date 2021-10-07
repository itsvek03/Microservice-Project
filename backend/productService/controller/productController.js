const models = require('../models');
const axios = require('axios')
// Get All Products
exports.getProducts = async (req, res) => {
    try {
        const getAllProductDetails = await models.Products.findAll({});

        if (getAllProductDetails.length == 0) {
            return res.status(404).json({ message: 'No Product available in the Store' })
        }
        return res.status(200).json({ products: getAllProductDetails });
    } catch (err) {
        return res.status(500).json({ message: "Something went wrong" });
    }
}

// Get Single Products
exports.getSingleProducts = async (req, res) => {
    try {
        const { sku } = req.params;
        console.log(sku);
        const getSingleProductDetails = await models.Products.findOne({
            where: {
                product_sku: sku
            }
        });
        if (!getSingleProductDetails) {
            return res.status(404).json({ message: 'Invalid Product sku_code' })
        }
        const data = await axios.get(`http://localhost:7000/api/price/${sku}`).then((response) => {
            return response.data.data;
        }).catch((err) => {
            return { err: err.response.data }
        })
        
        const stocksofProduct = await axios.get(`http://localhost:8000/api/stock/${sku}`).then((response) => {
            return response.data.data;
        }).catch((err) => {
            return { err: err.response.data }
        })

        getSingleProductDetails.dataValues.priceDetails = data;
        getSingleProductDetails.dataValues.stockDetails = stocksofProduct;
        return res.status(200).json({ products: getSingleProductDetails });
    } catch (err) {
        return res.status(500).json({ message: "Something went wrong" });
    }
}