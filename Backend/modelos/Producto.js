
const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/db');

const Producto = sequelize.define('product_v6', {
    partNumber: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING
    },
    value: {
        type: DataTypes.DOUBLE
    },
    valueCurrency: {
        type: DataTypes.STRING
    },
    productType: {
        type: DataTypes.STRING
    },
    categoryCode: {
        type: DataTypes.STRING,
        field: 'category.code'
    },
    status: {
        type: DataTypes.STRING
    },
    brandCode: {
        type: DataTypes.STRING,
        field: 'brand.code'
    },
    lineCode: {
        type: DataTypes.STRING,
        field: 'line.code'
    },
    plannerCode: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'product_v6',
    timestamps: false
});

module.exports = Producto;
