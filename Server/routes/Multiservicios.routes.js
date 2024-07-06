var express = require('express');
var router = express.Router();
var sql = require('../../Database/sqlConnection.js');

router.get('/', (req, res) => {
    new sql.Request().query('SELECT * FROM Multiservicios', (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send(data.recordset);
            console.dir(data.recordset);
        }
    })
})

router.get('/:RIF', (req, res) => {
    const { RIF } = req.params;
    new sql.Request().query(`SELECT * FROM Multiservicios WHERE RIF = ${RIF}`, (err, data) => {
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
    const { RIF, Nombre, Ciudad, CIEncargado } = req.body;
    new sql.Request().query(`INSERT INTO Multiservicios VALUES (${RIF}, '${Nombre}', '${Ciudad}', ${CIEncargado})`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('Multiservicio agregado');
        }
    })
})

router.delete('/:RIF', (req, res) => {
    const { RIF } = req.params;
    new sql.Request().query(`DELETE FROM Multiservicios WHERE RIF = ${RIF}`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('Multiservicio eliminado');
        }
    })
})

router.put('/:RIF', (req, res) => {
    const { RIF } = req.params;
    const { Nombre, Ciudad, CIEncargado } = req.body;
    new sql.Request().query(`UPDATE Multiservicios SET Nombre = '${Nombre}', Ciudad = '${Ciudad}', CIEncargado = ${CIEncargado} WHERE RIF = ${RIF}`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('Multiservicio actualizado');
        }
    })
})

module.exports = router;