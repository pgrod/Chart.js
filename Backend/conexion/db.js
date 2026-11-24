
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'products',
    'root',
    'Coquien12!',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

module.exports = sequelize;
