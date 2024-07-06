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
    new sql.Request().query(`SELECT * FROM Proveedores WHERE RIFProveedor = ${RIFProveedor}`, (err, data) => {
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
    new sql.Request().query(`INSERT INTO Proveedores VALUES (${RIFProveedor}, '${RazonSocial}', ${TelefonoLocal}, '${Contacto}', ${Celular}, '${Direccion}', ${CodLinea})`, (err, data) => {
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
    new sql.Request().query(`DELETE FROM Proveedores WHERE RIFProveedor = ${RIFProveedor}`, (err, data) => {
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
    new sql.Request().query(`UPDATE Proveedores SET RazonSocial = '${RazonSocial}, TelefonoLocal = '${TelefonoLocal}, Contacto = '${Contacto}, Celular = '${Celular}, Direccion = '${Direccion}, CodLinea = '${CodLinea} WHERE RIFProveedor = ${RIFProveedor}`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('Proveedor actualizado');
        }
    })
})

module.exports = router;