var express = require('express');
var router = express.Router();
var sql = require('../../Database/sqlConnection.js');

router.get('/', (req, res) => {
    new sql.Request().query('SELECT * FROM Encargados', (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send(data.recordset);
            console.dir(data.recordset);
        }
    })
})

router.get('/:CIEncargado', (req, res) => {
    const { CIEncargado } = req.params;
    new sql.Request().query(`SELECT * FROM Encargados WHERE CIEncargado = ${CIEncargado}`, (err, data) => {
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
    const { CIEncargado, FInicioEncargado } = req.body;
    new sql.Request().query(`INSERT INTO Encargados VALUES (${CIEncargado}, '${FInicioEncargado}')`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('Encargado agregado');
        }
    })
})

router.delete('/:CIEncargado', (req, res) => {
    const { CIEncargado } = req.params;
    new sql.Request().query(`DELETE FROM Encargados WHERE CIEncargado = ${CIEncargado}`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('Encargado eliminado');
        }
    })
})

router.put('/:CIEncargado', (req, res) => {
    const { CIEncargado } = req.params;
    const { FInicioEncargado } = req.body;
    new sql.Request().query(`UPDATE Encargados SET FInicioEncargado = '${FInicioEncargado} WHERE CIEncargado = ${CIEncargado}`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('Encargado actualizado');
        }
    })
})

module.exports = router;

