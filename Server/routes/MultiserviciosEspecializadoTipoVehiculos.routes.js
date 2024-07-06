var express = require('express');
var router = express.Router();
var sql = require('../../Database/sqlConnection.js');

router.get('/', (req, res) => {
    new sql.Request().query('SELECT * FROM MultiserviciosEspecializadoTipoVehiculos', (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send(data.recordset);
            console.dir(data.recordset);
        }
    })
})

router.get('/:Idtipo/:RIF', (req, res) => {
    const { Idtipo, RIF } = req.params;
    new sql.Request().query(`SELECT * FROM MultiserviciosEspecializadoTipoVehiculo WHERE Idtipo = ${Idtipo} AND RIF = ${RIF}`, (err, data) => {
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
    const { Idtipo, RIF } = req.body;
    new sql.Request().query(`INSERT INTO MultiserviciosEspecializadoTipoVehiculos VALUES (${Idtipo}, '${RIF}'`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('MultiserviciosEspecializadoTipoVehiculo agregado');
        }
    })
})

router.delete('/:Idtipo/:RIF', (req, res) => {
    const { Idtipo, RIF } = req.params;
    new sql.Request().query(`DELETE FROM MultiserviciosEspecializadoTipoVehiculos WHERE Idtipo = ${Idtipo} AND RIF = ${RIF}`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('MultiserviciosEspecializadoTipoVehiculo eliminado');
        }
    })
})

module.exports = router;