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

router.get('/:CodS/:CodAct/:CodMant', (req, res) => {
    const { CodS, CodAct, CodMant } = req.params;
    let query = `SELECT * FROM ActividadesPorMantenimiento WHERE CodS = @CodS AND CodAct = @CodAct AND CodMant = @CodMant`;
    new sql.Request()
        .input('CodS', sql.Int, CodS)
        .input('CodAct', sql.Int, CodAct)
        .input('CodMant', sql.Int, CodMant)
        .query(query, (err, data) => {
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
    let query = `INSERT INTO ActividadesPorMantenimiento (CodS, CodAct, CodMant) VALUES (@CodS, @CodAct, @CodMant)`;
    new sql.Request()
        .input('CodS', sql.Int, CodS)
        .input('CodAct', sql.Int, CodAct)
        .input('CodMant', sql.Int, CodMant)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('ActividadPorMantenimiento agregado');
            }
        })
})

router.delete('/:CodS/:CodAct/:CodMant', (req, res) => {
    const { CodS, CodAct, CodMant } = req.params;
    let query = `DELETE FROM ActividadesPorMantenimiento WHERE CodS = @CodS AND CodAct = @CodAct AND CodMant = @CodMant`;
    new sql.Request()
        .input('CodS', sql.Int, CodS)
        .input('CodAct', sql.Int, CodAct)
        .input('CodMant', sql.Int, CodMant)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('ActividadPorMantenimiento eliminado');
            }
        })
})

module.exports = router;