var express = require('express');
var router = express.Router();
var sql = require('../../Database/sqlConnection.js');

router.get('/', (req, res) => {
    new sql.Request().query('SELECT * FROM FacturasServicios', (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send(data.recordset);
            console.dir(data.recordset);
        }
    })
})

router.get('/:CodFacturaS', (req, res) => {
    const { CodFacturaS } = req.params;
    new sql.Request().query(`SELECT * FROM FacturasServicios WHERE CodFacturaS = ${CodFacturaS}`, (err, data) => {
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
    const { CodFacturaS, FechaE, Monto, CodVehiculo } = req.body;
    new sql.Request().query(`INSERT INTO FacturasServicios VALUES (${CodFacturaS}, '${FechaE}', ${Monto}, '${CodVehiculo}')`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('FacturaServicio agregado');
        }
    })
})

router.delete('/:CodFacturaS', (req, res) => {
    const { CodFacturaS } = req.params;
    new sql.Request().query(`DELETE FROM FacturasServicios WHERE CodFacturaS = ${CodFacturaS}`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('FacturaServicio eliminado');
        }
    })
})

router.put('/:CodFacturaS', (req, res) => {
    const { CodFacturaS } = req.params;
    const { FechaE, Monto, CodVehiculo } = req.body;
    new sql.Request().query(`UPDATE FacturasServicios SET FechaE = '${FechaE}, Monto = '${Monto}, CodVehiculo = '${CodVehiculo} WHERE CodFacturaS = ${CodFacturaS}`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('FacturaServicio actualizado');
        }
    })
})

module.exports = router;