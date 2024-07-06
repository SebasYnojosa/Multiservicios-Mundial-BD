var express = require('express');
var router = express.Router();
var sql = require('../../Database/sqlConnection.js');

router.get('/', (req, res) => {
    new sql.Request().query('SELECT * FROM ActividadesPorMantenimiento', (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send(data.recordset);
            console.dir(data.recordset);
        }
    })
})

router.get('/:CodSCodActCodMant', (req, res) => {
    const { CodS, CodAct, CodMant } = req.params;
    new sql.Request().query(`SELECT * FROM ActividadesPorMantenimiento WHERE CodS = ${CodS} AND CodAct = ${CodAct} AND CodMant = ${CodMant}`, (err, data) => {
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
    const { CodS, CodAct, CodMant } = req.body;
    new sql.Request().query(`INSERT INTO ActividadesPorMantenimiento VALUES (${CodS}, '${CodAct}', ${CodMant})`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('ActividadesPorMantenimiento agregado');
        }
    })
})

router.delete('/:CodSCodActCodMant', (req, res) => {
    const { CodS, CodAct, CodMant } = req.params;
    new sql.Request().query(`DELETE FROM ActividadesPorMantenimiento WHERE CodS = ${CodS} AND CodAct = ${CodAct} AND CodMant = ${CodMant}`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('ActividadPorMantenimiento eliminado');
        }
    })
})

module.exports = router;