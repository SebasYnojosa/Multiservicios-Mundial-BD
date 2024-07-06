var express = require('express');
var router = express.Router();
var sql = require('../../Database/sqlConnection.js');

router.get('/', (req, res) => {
    new sql.Request().query('SELECT * FROM DetalleFacturaTienda', (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send(data.recordset);
            console.dir(data.recordset);
        }
    })
})

router.get('/:CodFCodP', (req, res) => {
    const { CodF, CodP } = req.params;
    new sql.Request().query(`SELECT * FROM DetalleFacturaTienda WHERE CodF = ${CodF} AND CodP = ${CodP}`, (err, data) => {
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
    const { CodF, CodP, Cantidad, PrecioT } = req.body;
    new sql.Request().query(`INSERT INTO DetalleFacturaTienda VALUES (${CodF}, '${CodP}', ${Cantidad}, '${PrecioT}')`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('DetalleFacturaTienda agregado');
        }
    })
})

router.delete('/:CodFCodP', (req, res) => {
    const { CodF, CodP } = req.params;
    new sql.Request().query(`DELETE FROM DetalleFacturaTienda WHERE CodF = ${CodF} AND CodP = ${CodP}`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('DetalleFacturaTienda eliminado');
        }
    })
})

router.put('/:CodFCodP', (req, res) => {
    const { CodF, CodP } = req.params;
    const { Cantidad, PrecioT } = req.body;
    new sql.Request().query(`UPDATE DetalleFacturaTienda SET Cantidad = '${Cantidad}, PrecioT = '${PrecioT}' WHERE CodF = ${CodF} AND CodP = ${CodP}`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('DetalleFacturaTienda actualizado');
        }
    })
})

module.exports = router;