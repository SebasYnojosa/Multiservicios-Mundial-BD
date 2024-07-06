var express = require('express');
var router = express.Router();
var sql = require('../../Database/sqlConnection.js');

router.get('/', (req, res) => {
    new sql.Request().query('SELECT * FROM ActividadRequiereProducto', (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send(data.recordset);
            console.dir(data.recordset);
        }
    })
})

router.get('/:CodS/:CodAct/:CodP', (req, res) => {
    const { CodS, CodAct, CodP } = req.params;
    new sql.Request().query(`SELECT * FROM ActividadRequiereProducto WHERE CodS = ${CodS} AND CodAct = ${CodAct} AND CodP = ${CodP}`, (err, data) => {
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
    const { CodS, CodAct, CodP, Cantidad } = req.body;
    new sql.Request().query(`INSERT INTO ActividadRequiereProducto VALUES (${CodS}, '${CodAct}', ${CodP}, '${Cantidad}')`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('ActividadRequiereProducto agregado');
        }
    })
})

router.delete('/:CodS/:CodAct/:CodP', (req, res) => {
    const { CodS, CodAct, CodP } = req.params;
    new sql.Request().query(`DELETE FROM ActividadRequiereProducto WHERE CodS = ${CodS} AND CodAct = ${CodAct} AND CodP = ${CodP}`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('ActividadRequiereProducto eliminado');
        }
    })
})

router.put('/:CodS/:CodAct/:CodP', (req, res) => {
    const { CodS, CodAct, CodP } = req.params;
    const { Cantidad } = req.body;
    new sql.Request().query(`UPDATE ActividadRequiereProducto SET Cantidad = '${Cantidad} WHERE CodS = ${CodS} AND CodAct = ${CodAct} AND CodP = ${CodP}`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('ActividadRequiereProducto actualizado');
        }
    })
})

module.exports = router;