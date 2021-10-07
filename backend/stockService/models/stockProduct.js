'use strict';

module.exports = (sequelize, DataTypes) => {
    const StockProduct = sequelize.define('stockProduct', {
        product_sku: DataTypes.STRING,
        stock: {
            type: DataTypes.JSON,
            defaultValue: {
                ind: {
                    ind_available: 0,
                    ind_purchased: 0
                },
                usd: {
                    usd_available: 0,
                    usd_purchased: 0
                }
            }
        },
        total_available_stock: {
            type: DataTypes.FLOAT,
            defaultValue: 0
        },
        total_purchased: {
            type: DataTypes.FLOAT,
            defaultValue: 0
        }
    }, {
        freezetableName: true,
        tableName: 'tbl_stockProduct'
    })


    return StockProduct;
};