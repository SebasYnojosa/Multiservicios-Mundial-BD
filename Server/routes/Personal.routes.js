var express = require('express');
var router = express.Router();
var sql = require('../../Database/sqlConnection.js');

router.get('/', (req, res) => {
    new sql.Request().query('SELECT * FROM Personal', (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send(data.recordset);
            console.dir(data.recordset);
        }
    })
})

router.get('/:CI', (req, res) => {
    const { CI } = req.params;
    new sql.Request().query(`SELECT * FROM Personal WHERE CI = ${CI}`, (err, data) => {
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
    const { CI, NombreC, Direccion, Telefono, Salario, RIFMultiserv } = req.body;
    new sql.Request().query(`INSERT INTO Personal VALUES (${CI}, '${NombreC}', '${Direccion}', '${Telefono}', ${Salario}, ${RIFMultiserv})`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('Personal agregado');
        }
    })
})