var express = require('express');
var router = express.Router();
var sql = require('../../Database/sqlConnection.js');

router.get('/', (req, res) => {
    new sql.Request().query('SELECT * FROM ActividadPorSolicitud', (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send(data.recordset);
            console.dir(data.recordset);
        }
    })
})

router.get('/:CodFicha/:CodS/:CodAct', (req, res) => {
    const { CodFicha, CodS, CodAct } = req.params;
    new sql.Request().query(`SELECT * FROM ActividadPorSolicitud WHERE CodFicha = ${CodFicha} AND CodS = ${CodS} AND CodAct = ${CodAct}`, (err, data) => {
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
    const { CodFicha, CodS, CodAct, CantAct, Costo } = req.body;
    new sql.Request().query(`INSERT INTO ActividadPorSolicitud VALUES (${CodFicha}, '${CodS}', ${CodAct}, '${CantAct}', ${Costo})`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('ActividadPorSolicitud agregado');
        }
    })
})

router.delete('/:CodFicha/:CodS/:CodAct', (req, res) => {
    const { CodFicha, CodS, CodAct } = req.params;
    new sql.Request().query(`DELETE FROM ActividadPorSolicitud WHERE CodFicha = ${CodFicha} AND CodS = ${CodS} AND CodAct = ${CodAct}`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('ActividadPorSolicitud eliminado');
        }
    })
})

router.put('/:CodFicha/:CodS/:CodAct', (req, res) => {
    const { CodFicha, CodS, CodAct } = req.params;
    const { CantAct, Costo } = req.body;
    new sql.Request().query(`UPDATE ActividadPorSolicitud SET CantAct = '${CantAct}, Costo = '${Costo}' WHERE CodFicha = ${CodFicha} AND CodS = ${CodS} AND CodAct = ${CodAct}`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('ActividadPorSolicitud actualizado');
        }
    })
})

module.exports = router;