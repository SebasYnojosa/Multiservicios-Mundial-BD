var express = require('express');
var router = express.Router();
var sql = require('../../Database/sqlConnection.js');

router.get('/', (req, res) => {
    new sql.Request().query('SELECT * FROM TipoVehiculos', (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send(data.recordset);
            console.dir(data.recordset);
        }
    })
})

router.get('/:Idtipo', (req, res) => {
    const { Idtipo } = req.params;
    new sql.Request().query(`SELECT * FROM TipoVehiculos WHERE Idtipo = ${Idtipo}`, (err, data) => {
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
    const { Idtipo, DescripcionT } = req.body;
    new sql.Request().query(`INSERT INTO TipoVehiculos VALUES (${Idtipo}, '${DescripcionT}')`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('TipoVehiculo agregado');
        }
    })
})

module.exports = router;