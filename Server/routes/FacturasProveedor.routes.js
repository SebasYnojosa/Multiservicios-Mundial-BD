var express = require('express');
var router = express.Router();
var sql = require('../../Database/sqlConnection.js');

router.get('/', (req, res) => {
    new sql.Request().query('SELECT * FROM FacturasProveedor', (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send(data.recordset);
            console.dir(data.recordset);
        }
    })
})

router.get('/:CodFactura', (req, res) => {
    const { CodFactura } = req.params;
    new sql.Request().query(`SELECT * FROM FacturasProveedor WHERE CodFactura = ${CodFactura}`, (err, data) => {
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
    const { CodFactura, FechaE, Monto, RIFMultiServ } = req.body;
    new sql.Request().query(`INSERT INTO FacturasProveedor VALUES (${CodFactura}, '${FechaE}', ${Monto}, '${RIFMultiServ}')`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('FacturaProveedor agregado');
        }
    })
})

router.delete('/:CodFactura', (req, res) => {
    const { CodFactura } = req.params;
    new sql.Request().query(`DELETE FROM FacturasProveedor WHERE CodFactura = ${CodFactura}`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('FacturaProveedor eliminado');
        }
    })
})

router.put('/:CodFactura', (req, res) => {
    const { CodFactura } = req.params;
    const { FechaE, Monto, RIFMultiServ } = req.body;
    new sql.Request().query(`UPDATE FacturasProveedor SET FechaE = '${FechaE}, Monto = '${Monto}, RIFMultiServ = '${RIFMultiServ} WHERE CodFactura = ${CodFactura}`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('FacturaProveedor actualizado');
        }
    })
})

module.exports = router;