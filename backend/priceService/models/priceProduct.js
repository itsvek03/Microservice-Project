'use strict';

module.exports = (sequelize, DataTypes) => {
    const PriceProduct = sequelize.define('priceProduct', {
        product_sku: {
            type: DataTypes.STRING,
        },
        product_inr: {
            type: DataTypes.FLOAT,
            defaultValue: 0
        },
        product_usd: {
            type: DataTypes.FLOAT,
            defaultValue: 0
        },
    }, {
        freezetableName: true,
        tableName: 'tbl_price_products'
    })

    return PriceProduct;
};