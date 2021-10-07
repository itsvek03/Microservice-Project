const models = require('../models');

exports.getProductStock = async (req, res) => {
    try {
        let { sku } = req.params;
        const getStockdetails = await models.stockProduct.findOne({
            where: {
                product_sku: sku
            }
        })
        if (!getStockdetails) {
            return res.status(200).json({ message: 'Product not found' })
        }
        return res.status(200).json({ data: getStockdetails })
    } catch (err) {
        return res.status(500).json({ message: "Something went wrong" })
    }
}

exports.updateStockProduct = async (req, res) => {
    try {
        const { sku, country } = req.params;
        const { quantity } = req.body;
        const checkSku = await models.stockProduct.findOne({
            where: {
                product_sku: sku
            }
        })
        if (!checkSku) {
            return res.status(400).json({ message: 'sku not found' })
        }

        if (country == 'ind' || country == 'usd') {
            if (checkSku.total_available_stock == 0) {
                return res.status(404).json({ message: `Out of Stock` })
            }
            let availableStockInd = checkSku.stock.ind;
            let availableStockUsd = checkSku.stock.usd;
            switch (country) {
                case 'ind':
                    if (Number(availableStockInd.ind_available) < Number(quantity)) {
                        return res.status(400).json({ message: 'Quantity is less than the available stock' })
                    }
                    availableStockInd.ind_available = Number(availableStockInd.ind_available) - Number(quantity);
                    availableStockInd.ind_purchased = Number(availableStockInd.ind_purchased) + Number(quantity);
                    checkSku.total_available_stock = Number(availableStockInd.ind_available) + Number(availableStockUsd.usd_available);
                    checkSku.total_purchased = Number(availableStockInd.ind_purchased) + Number(availableStockUsd.usd_purchased);
                    await models.stockProduct.update({
                        stock: checkSku.stock,
                        total_available_stock: checkSku.total_available_stock,
                        total_purchased: checkSku.total_purchased
                    }, {
                        where: {
                            product_sku: sku
                        }
                    })
                    break;
                case 'usd':
                    if (Number(availableStockUsd.usd_available) < Number(quantity)) {
                        return res.status(400).json({ message: 'Quantity is less than the available stock' })
                    }
                    availableStockUsd.usd_available = Number(availableStockUsd.usd_available) - Number(quantity);
                    availableStockUsd.usd_purchased = Number(availableStockUsd.usd_purchased) + Number(quantity);
                    checkSku.total_available_stock = Number(availableStockInd.ind_available) + Number(availableStockUsd.usd_available);
                    checkSku.total_purchased = Number(availableStockInd.ind_purchased) + Number(availableStockUsd.usd_purchased);
                    await models.stockProduct.update({
                        stock: checkSku.stock,
                        total_available_stock: checkSku.total_available_stock,
                        total_purchased: checkSku.total_purchased
                    }, {
                        where: {
                            product_sku: sku
                        }
                    })
                    break;
                default:
                    break;
            }
            return res.status(200).json({ message: "Stock Updated Successfully " })

        } else {
            return res.status(400).json({ message: "Invalid Country Code" })
        }

    } catch (err) {
        return res.status(500).json({ message: "Something went wrong" })
    }
}