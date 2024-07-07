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

router.get('/:CodS/:CodAct/:CodP', (req, res) => {
    const { CodS, CodAct, CodP } = req.params;
    let query = `SELECT * FROM ProductoUsadoActividad WHERE CodS = @CodS AND CodAct = @CodAct AND CodP = @CodP`;
    new sql.Request()
        .input('CodS', sql.Int, CodS)
        .input('CodAct', sql.Int, CodAct)
        .input('CodP', sql.Int, CodP)
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
    const { CodS, CodAct, CodP, Cantidad, Costo } = req.body;
    let query = `INSERT INTO ProductoUsadoActividad VALUES (@CodS, @CodAct, @CodP, @Cantidad, @Costo)`;
    new sql.Request()
        .input('CodS', sql.Int, CodS)
        .input('CodAct', sql.Int, CodAct)
        .input('CodP', sql.Int, CodP)
        .input('Cantidad', sql.Int, Cantidad)
        .input('Costo', sql.Decimal, Costo)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('ProductoUsadoActividad agregado');
            }
        })
})

router.delete('/:CodS/:CodAct/:CodP', (req, res) => {
    const { CodS, CodAct, CodP } = req.params;
    let query = `DELETE FROM ProductoUsadoActividad WHERE CodS = @CodS AND CodAct = @CodAct AND CodP = @CodP`;
    new sql.Request()
        .input('CodS', sql.Int, CodS)
        .input('CodAct', sql.Int, CodAct)
        .input('CodP', sql.Int, CodP)
        .query(query, (err, data) => { 
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('ProductoUsadoActividad eliminado');
            }
        })
})

router.put('/:CodS/:CodAct/:CodP', (req, res) => {
    const { CodS, CodAct, CodP } = req.params;
    const { Cantidad, Costo } = req.body;
    let query = `UPDATE ProductoUsadoActividad SET Cantidad = @Cantidad, Costo = @Costo WHERE CodS = @CodS AND CodAct = @CodAct AND CodP = @CodP`;
    new sql.Request()
        .input('CodS', sql.Int, CodS)
        .input('CodAct', sql.Int, CodAct)
        .input('CodP', sql.Int, CodP)
        .input('Cantidad', sql.Int, Cantidad)
        .input('Costo', sql.Decimal, Costo)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('ProductoUsadoActividad actualizado');
            }
        }) 
})

module.exports = router;