var express = require('express');
var router = express.Router();
var sql = require('../../Database/sqlConnection.js');

router.get('/', (req, res) => {
    new sql.Request().query('SELECT * FROM ProductoUsadoActividad', (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send(data.recordset);
            console.dir(data.recordset);
        }
    })
})

router.get('/:CodSCodActCodP', (req, res) => {
    const { CodS, CodAct, CodP } = req.params;
    new sql.Request().query(`SELECT * FROM ProductoUsadoActividad WHERE CodS = ${CodS} AND CodAct = ${CodAct} AND CodP = ${CodP}`, (err, data) => {
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
    const { CodS, CodAct, CodP, Cantidad, Costo } = req.body;
    new sql.Request().query(`INSERT INTO ProductoUsadoActividad VALUES (${CodS}, '${CodAct}', ${CodP}, '${Cantidad}', ${Costo})`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('ProductoUsadoActividad agregado');
        }
    })
})

router.delete('/:CodSCodActCodP', (req, res) => {
    const { CodS, CodAct, CodP } = req.params;
    new sql.Request().query(`DELETE FROM ProductoUsadoActividad WHERE CodS = ${CodS} AND CodAct = ${CodAct} AND CodP = ${CodP}`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('ProductoUsadoActividad eliminado');
        }
    })
})

router.put('/:CodSCodActCodP', (req, res) => {
    const { CodS, CodAct, CodP } = req.params;
    const { Cantidad, Costo } = req.body;
    new sql.Request().query(`UPDATE ProductoUsadoActividad SET Cantidad = '${Cantidad}, Costo = '${Costo}' WHERE CodS = ${CodS} AND CodAct = ${CodAct} AND CodP = ${CodP}`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('ProductoUsadoActividad actualizado');
        }
    })
})

module.exports = router;