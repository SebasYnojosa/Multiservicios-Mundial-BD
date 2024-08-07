var express = require('express');
var router = express.Router();
var sql = require('../../Database/sqlConnection.js');

router.get('/', (req, res) => {
    new sql.Request().query('SELECT p.CodProducto, p.Nombre, p.Descripcion, p.Precio, p.Ecologico, l.Descripcion AS NombreLinea, COUNT(spa.CodFichaSS) * arp.Cantidad AS CantidadUsada FROM Productos p, LineasSuministros l, ActividadRequiereProducto arp, SolicitudPideActividades spa WHERE l.CodLinea = p.CodLinea AND arp.CodP = p.CodProducto AND spa.CodAct = arp.CodAct GROUP BY p.CodProducto, p.Nombre, p.Descripcion, p.Precio, p.Ecologico, l.Descripcion, arp.Cantidad', (err, data) => {
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
    let query = `SELECT p.CodProducto, p.Nombre, p.Descripcion, p.Precio, p.Ecologico, l.Descripcion AS NombreLinea, COUNT(spa.CodFichaSS) * arp.Cantidad AS CantidadUsada FROM Productos p, LineasSuministros l, ActividadRequiereProducto arp, SolicitudPideActividades spa WHERE CodProducto = @CodProducto, l.CodLinea = p.CodLinea AND arp.CodP = p.CodProducto AND spa.CodAct = arp.CodAct GROUP BY p.CodProducto, p.Nombre, p.Descripcion, p.Precio, p.Ecologico, l.Descripcion, arp.Cantidad`;
    new sql.Request()
        .input('CodProducto', sql.Int, CodProducto)
        .query(query, (err, data) => {
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
    const { CodProducto, Nombre, Descripcion, Precio, Ecologico, CodLinea } = req.body;
    let query = `INSERT INTO Productos VALUES (@CodProducto, @Nombre, @Descripcion, @Precio, @Ecologico, @CodLinea)`;
    new sql.Request()
        .input('CodProducto', sql.Int, CodProducto)
        .input('Nombre', sql.VarChar, Nombre)
        .input('Descripcion', sql.VarChar, Descripcion)
        .input('Precio', sql.Decimal, Precio)
        .input('Ecologico', sql.Char, Ecologico)
        .input('CodLinea', sql.Int, CodLinea)
        .query(query, (err, data) => {
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
    let query = `DELETE FROM Productos WHERE CodProducto = @CodProducto`;
    new sql.Request()
        .input('CodProducto', sql.Int, CodProducto)
        .query(query, (err, data) => { 
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
    const { Nombre, Descripcion, Precio, Ecologico, CodLinea } = req.body;
    let query = `UPDATE Productos SET Nombre = @Nombre, Descripcion = @Descripcion, Precio = @Precio, Ecologico = @Ecologico, CodFacturaT = @CodFacturaT, CodLinea = @CodLinea WHERE CodProducto = @CodProducto`;
    new sql.Request()
        .input('CodProducto', sql.Int, CodProducto)
        .input('Nombre', sql.VarChar, Nombre)
        .input('Descripcion', sql.VarChar, Descripcion)
        .input('Precio', sql.Decimal, Precio)
        .input('Ecologico', sql.Char, Ecologico)
        .input('CodLinea', sql.Int, CodLinea)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('Producto actualizado');
            }
        })
})

module.exports = router;