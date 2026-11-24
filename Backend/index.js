
const express = require('express');
const cors = require('cors');
const sequelize = require('./conexion/db');
const Producto = require('./modelos/Producto');

const app = express();

app.use(cors());
app.use(express.json());

// 1. Contar productos
app.get('/productos/total', async (req, res) => {
    try {
        const resultado = await Producto.findAll({
            attributes: [
                [sequelize.fn('COUNT', sequelize.literal('*')), 'total_products']
            ]
        });
        res.json(resultado);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error al contar productos' });
    }
});

// 2. Calcular el valor total de todos los productos
app.get('/productos/valor-total', async (req, res) => {
    try {
        const resultado = await Producto.findAll({
            attributes: [
                [sequelize.fn('SUM', sequelize.col('value')), 'valor_total']
            ]
        });
        res.json(resultado);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error al calcular valor total' });
    }
});

// 3. Obtener el valor promedio de los productos
app.get('/productos/promedio', async (req, res) => {
    try {
        const resultado = await Producto.findAll({
            attributes: [
                [sequelize.fn('AVG', sequelize.col('value')), 'valor_promedio']
            ]
        });
        res.json(resultado);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error al calcular promedio' });
    }
});

// 4. Encontrar el producto con el valor más alto
app.get('/productos/maximo', async (req, res) => {
    try {
        const resultado = await Producto.findAll({
            order: [['value', 'DESC']],
            limit: 1
        });
        res.json(resultado);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error al obtener maximo' });
    }
});

// 5. Encontrar el producto con el valor más bajo
app.get('/productos/minimo', async (req, res) => {
    try {
        const resultado = await Producto.findAll({
            order: [['value', 'ASC']],
            limit: 1
        });
        res.json(resultado);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error al obtener minimo' });
    }
});

// 6. Contar el número de productos de cada tipo de moneda (valueCurrency)
app.get('/productos/monedas', async (req, res) => {
    try {
        const resultado = await Producto.findAll({
            attributes: [
                'valueCurrency',
                [sequelize.fn('COUNT', sequelize.literal('*')), 'total_productos']
            ],
            group: ['valueCurrency']
        });
        res.json(resultado);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error al contar por moneda' });
    }
});

// 7. Calcular el valor promedio de los productos por cada tipo de moneda (valueCurrency)
app.get('/productos/promedio-moneda', async (req, res) => {
    try {
        const resultado = await Producto.findAll({
            attributes: [
                'valueCurrency',
                [sequelize.fn('AVG', sequelize.col('value')), 'valor_promedio']
            ],
            group: ['valueCurrency']
        });
        res.json(resultado);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error al calcular promedio por moneda' });
    }
});

// 8. Obtener el valor total de los productos por productType
app.get('/productos/total-tipo', async (req, res) => {
    try {
        const resultado = await Producto.findAll({
            attributes: [
                'productType',
                [sequelize.fn('SUM', sequelize.col('value')), 'valor_total']
            ],
            group: ['productType']
        });
        res.json(resultado);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error al calcular total por tipo' });
    }
});

// 9. Encontrar el valor máximo y mínimo por productType
app.get('/productos/maximo-minimo-tipo', async (req, res) => {
    try {
        const resultado = await Producto.findAll({
            attributes: [
                'productType',
                [sequelize.fn('MAX', sequelize.col('value')), 'valor_maximo'],
                [sequelize.fn('MIN', sequelize.col('value')), 'valor_minimo']
            ],
            group: ['productType']
        });
        res.json(resultado);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error al obtener maximo y minimo' });
    }
});

// 10. Calcular el valor promedio de productos por cada categoryCode
app.get('/productos/promedio-categoria', async (req, res) => {
    try {
        const resultado = await Producto.findAll({
            attributes: [
                'categoryCode',
                [sequelize.fn('AVG', sequelize.col('value')), 'valor_promedio']
            ],
            group: ['category.code']
        });
        res.json(resultado);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error al calcular promedio por categoria' });
    }
});

// 11. Contar productos disponibles en cada status
app.get('/productos/status', async (req, res) => {
    try {
        const resultado = await Producto.findAll({
            attributes: [
                'status',
                [sequelize.fn('COUNT', sequelize.literal('*')), 'total_products']
            ],
            group: ['status']
        });
        res.json(resultado);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error al contar por status' });
    }
});

// 12. Calcular el valor total de productos en cada brandCode:
app.get('/productos/total-marca', async (req, res) => {
    try {
        const resultado = await Producto.findAll({
            attributes: [
                'brandCode',
                [sequelize.fn('SUM', sequelize.col('value')), 'valor_total']
            ],
            group: ['brand.code']
        });
        res.json(resultado);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error al calcular total por marca' });
    }
});

// 13. Obtener el número total de códigos de productos únicos (partNumber)
app.get('/productos/codigos-unicos', async (req, res) => {
    try {
        const resultado = await Producto.findAll({
            attributes: [
                [sequelize.fn('COUNT',
                    sequelize.fn('DISTINCT', sequelize.col('partNumber'))
                ), 'codigos_unicos']
            ]
        });
        res.json(resultado);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error al contar codigos unicos' });
    }
});

// 14. Calcular el valor promedio y la cantidad de productos por cada lineCode
app.get('/productos/promedio-linea', async (req, res) => {
    try {
        const resultado = await Producto.findAll({
            attributes: [
                'lineCode',
                [sequelize.fn('AVG', sequelize.col('value')), 'valor_promedio'],
                [sequelize.fn('COUNT', sequelize.literal('*')), 'cantidad_productos']
            ],
            group: ['line.code']
        });
        res.json(resultado);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error al calcular promedio por linea' });
    }
});

// 15. Encontrar el producto con el valor más alto por cada plannerCode
app.get('/productos/maximo-planner', async (req, res) => {
    try {
        const resultado = await sequelize.query(`
            SELECT plannerCode, partNumber, name, value
            FROM product_v6 AS p
            WHERE value = (
                SELECT MAX(value)
                FROM product_v6
                WHERE plannerCode = p.plannerCode
            )
        `);

        res.json(resultado[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensaje: 'Error al obtener maximo por planner' });
    }
});

app.get('/', (req, res) => {
    res.send('API de agregaciones funcionando');
});

sequelize.authenticate()
    .then(() => {
        console.log('Conexion a MySQL exitosa');
    })
    .catch((error) => {
        console.log('Error de conexion:', error);
    });

app.listen(3002, () => {
    console.log('Servidor en puerto 3002');
});

