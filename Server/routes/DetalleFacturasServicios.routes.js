var express = require('express');
var router = express.Router();
var sql = require('../../Database/sqlConnection.js');

router.get('/', (req, res) => {
    new sql.Request().query('SELECT * FROM DetalleFacturasServicios', (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send(data.recordset);
            console.dir(data.recordset);
        }
    })
})

router.get('/:CodF/:CodServ', (req, res) => {
    const { CodF, CodServ } = req.params;
    new sql.Request().query(`SELECT * FROM DetalleFacturasServicios WHERE CodF = ${CodF} AND CodServ = ${CodServ}`, (err, data) => {
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
    const { CodF, CodServ, MontoDetalle } = req.body;
    new sql.Request().query(`INSERT INTO DetalleFacturasServicios VALUES (${CodF}, '${CodServ}', ${MontoDetalle})`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('DetalleFacturaServicio agregado');
        }
    })
})

router.delete('/:CodF/:CodServ', (req, res) => {
    const { CodF, CodServ } = req.params;
    new sql.Request().query(`DELETE FROM DetalleFacturasServicios WHERE CodF = ${CodF} AND CodServ = ${CodServ}`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('FacturaProveedor eliminado');
        }
    })
})

router.put('/:CodF/:CodServ', (req, res) => {
    const { CodF, CodServ } = req.params;
    const { MontoDetalle } = req.body;
    new sql.Request().query(`UPDATE DetalleFacturasServicios SET MontoDetalle = '${MontoDetalle} CodF = ${CodF} AND CodServ = ${CodServ}`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('DetalleFacturasServicios actualizado');
        }
    })
})

module.exports = router;