'use strict';

module.exports = (sequelize, DataTypes) => {
    const Products = sequelize.define('Products', {
        product_sku: {
            type: DataTypes.STRING,
        },
        product_name: {
            type: DataTypes.STRING,
        },
    }, {
        freezetableName: true,
        tableName: 'tbl_products'
    })

    return Products;
};