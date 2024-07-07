var express = require('express');
var router = express.Router();
var sql = require('../../Database/sqlConnection.js');

router.get('/', (req, res) => {
    new sql.Request().query('SELECT * FROM Proveedores', (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send(data.recordset);
            console.dir(data.recordset);
        }
    })
})

router.get('/:RIFProveedor', (req, res) => {
    const { RIFProveedor } = req.params;
    let query = `SELECT * FROM Proveedores WHERE RIFProveedor = @RIFProveedor`;
    new sql.Request()
        .input('RIFProveedor', sql.Int, RIFProveedor)
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
    const { RIFProveedor, RazonSocial, TelefonoLocal, Contacto, Celular, Direccion, CodLinea } = req.body;
    let query = `INSERT INTO Proveedores VALUES (@RIFProveedor, @RazonSocial, @TelefonoLocal, @Contacto, @Celular, @Direccion, @CodLinea)`;
    new sql.Request()
        .input('RIFProveedor', sql.Int, RIFProveedor)
        .input('RazonSocial', sql.VarChar, RazonSocial)
        .input('TelefonoLocal', sql.VarChar, TelefonoLocal)
        .input('Contacto', sql.VarChar, Contacto)
        .input('Celular', sql.VarChar, Celular)
        .input('Direccion', sql.VarChar, Direccion)
        .input('CodLinea', sql.Int, CodLinea)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('Proveedor agregado');
            }
        })
})

router.delete('/:RIFProveedor', (req, res) => {
    const { RIFProveedor } = req.params;
    let query = `DELETE FROM Proveedores WHERE RIFProveedor = @RIFProveedor`;
    new sql.Request()
        .input('RIFProveedor', sql.Int, RIFProveedor)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('Proveedor eliminado');
            }
        })
})

router.put('/:RIFProveedor', (req, res) => {
    const { RIFProveedor } = req.params;
    const { RazonSocial, TelefonoLocal, Contacto, Celular, Direccion, CodLinea } = req.body;
    let query = `UPDATE Proveedores SET RazonSocial = @RazonSocial, TelefonoLocal = @TelefonoLocal, Contacto = @Contacto, Celular = @Celular, Direccion = @Direccion, CodLinea = @CodLinea WHERE RIFProveedor = @RIFProveedor}`;
    new sql.Request()
        .input('RIFProveedor', sql.Int, RIFProveedor)
        .input('RazonSocial', sql.VarChar, RazonSocial)
        .input('TelefonoLocal', sql.VarChar, TelefonoLocal)
        .input('Contacto', sql.VarChar, Contacto)
        .input('Celular', sql.VarChar, Celular)
        .input('Direccion', sql.VarChar, Direccion)
        .input('CodLinea', sql.Int, CodLinea)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('Proveedor actualizado');
            }
        })
})

module.exports = router;