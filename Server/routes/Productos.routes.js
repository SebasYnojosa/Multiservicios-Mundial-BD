var express = require('express');
var router = express.Router();
var sql = require('../../Database/sqlConnection.js');

router.get('/', (req, res) => {
    new sql.Request().query('SELECT * FROM Productos', (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send(data.recordset);
            console.dir(data.recordset);
        }
    })
})

router.get('/:CodProducto', (req, res) => {
    const { CodProducto } = req.params;
    new sql.Request().query(`SELECT * FROM Productos WHERE CodProducto = ${CodProducto}`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send(data.recordset);
            console.dir(data.recordset);
        }
    })
})

router.post('/', (req, res) => {
    const { CodProducto, Nombre, Descripcion, Precio, Ecologico, CodFacturaT, CantidadP, PrecioT, CodReq, CantProd, CodLinea } = req.body;
    new sql.Request().query(`INSERT INTO Productos VALUES (${CodProducto}, '${Nombre}', ${Descripcion}, '${Precio}', ${Ecologico}, '${CodFacturaT}', ${CantidadP}, '${PrecioT}, ${CodReq}, '${CantProd}', ${CodLinea})`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('Producto agregado');
        }
    })
})

router.delete('/:CodProducto', (req, res) => {
    const { CodProducto } = req.params;
    new sql.Request().query(`DELETE FROM Productos WHERE CodProducto = ${CodProducto}`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('Producto eliminado');
        }
    })
})

router.put('/:CodProducto', (req, res) => {
    const { CodProducto } = req.params;
    const { Nombre, Descripcion, Precio, Ecologico, CodFacturaT, CantidadP, PrecioT, CodReq, CantProd, CodLinea } = req.body;
    new sql.Request().query(`UPDATE Productos SET Nombre = '${Nombre}, Descripcion = '${Descripcion}, Precio = '${Precio}, Ecologico = '${Ecologico}, CodFacturaT = '${CodFacturaT}, CantidadP = '${CantidadP}, PrecioT = '${PrecioT}, CodReq = '${CodReq}, CantProd = '${CantProd}, CodLinea = '${CodLinea} WHERE CodProducto = ${CodProducto}`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('Producto actualizado');
        }
    })
})

module.exports = router;