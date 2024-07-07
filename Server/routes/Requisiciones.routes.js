var express = require('express');
var router = express.Router();
var sql = require('../../Database/sqlConnection.js');

router.get('/', (req, res) => {
    new sql.Request().query('SELECT * FROM Requisiciones', (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send(data.recordset);
            console.dir(data.recordset);
        }
    })
})

router.get('/:CodReq', (req, res) => {
    const { CodReq } = req.params;
    let query = `SELECT * FROM Requisiciones WHERE CodReq = @CodReq`;
    new sql.Request()
        .input('CodReq', sql.Int, CodReq)
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
    const { CodReq, FechaGenerada } = req.body;
    let query = `INSERT INTO Requisiciones VALUES (@CodReq, @FechaGenerada)`;
    new sql.Request()
        .input('CodReq', sql.Int, CodReq)
        .input('FechaGenerada', sql.Date, FechaGenerada)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('Requisicion agregado');
            }
        })
})

router.delete('/:CodReq', (req, res) => {
    const { CodReq } = req.params;
    let query = `DELETE FROM Requisiciones WHERE CodReq = @CodReq`;
    new sql.Request()
        .input('CodReq', sql.Int, CodReq)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('Requisicion eliminado');
            }
        })
})

router.put('/:CodReq', (req, res) => {
    const { CodReq } = req.params;
    const { FechaGenerada } = req.body;
    let query = `UPDATE Requisiciones SET FechaGenerada = @FechaGenerada WHERE CodReq = @CodReq`;
    new sql.Request()
        .input('CodReq', sql.Int, CodReq)
        .input('FechaGenerada', sql.Date, FechaGenerada)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('Requisicion actualizado');
            }
        })
})

module.exports = router;