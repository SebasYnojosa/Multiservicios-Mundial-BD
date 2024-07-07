var express = require('express');
var router = express.Router();
var sql = require('../../Database/sqlConnection.js');

router.get('/', (req, res) => {
    new sql.Request().query('SELECT * FROM ReservaApartaActividad', (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send(data.recordset);
            console.dir(data.recordset);
        }
    })
})

router.get('/:NumReserva/:CodS/:CodAct', (req, res) => {
    const { NumReserva, CodS, CodAct } = req.params;
    let query = `SELECT * FROM ReservaApartaActividad WHERE NumReserva = @NumReserva AND CodS = @CodS AND CodAct = @CodAct`;
    new sql.Request()
        .input('NumReserva', sql.Int, NumReserva)
        .input('CodS', sql.Int, CodS)
        .input('CodAct', sql.Int, CodAct)
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
    const { NumReserva, CodS, CodAct, Disponibilidad, FAnterior } = req.body;
    let query = `INSERT INTO ReservaApartaActividad VALUES (@NumReserva, @CodS, @CodAct, @Disponibilidad, @FAnterior)`;
    new sql.Request()
        .input('NumReserva', sql.Int, NumReserva)
        .input('CodS', sql.Int, CodS)
        .input('CodAct', sql.Int, CodAct)
        .input('Disponibilidad', sql.Char, Disponibilidad)
        .input('FAnterior', sql.Date, FAnterior)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('ReservaApartaActividad agregado');
            }
        })
    
})

router.delete('/:NumReserva/:CodS/:CodAct', (req, res) => {
    const { NumReserva, CodS, CodAct } = req.params;
    let query = `DELETE FROM ReservaApartaActividad WHERE NumReserva = @NumReserva AND CodS = @CodS AND CodAct = @CodAct`;
    new sql.Request()
        .input('NumReserva', sql.Int, NumReserva)
        .input('CodS', sql.Int, CodS)
        .input('CodAct', sql.Int, CodAct)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('ReservaApartaActividad eliminado');
            }
        })
})

router.put('/:NumReserva/:CodS/:CodAct', (req, res) => {
    const { NumReserva, CodS, CodAct } = req.params;
    const { Disponibilidad, FAnterior } = req.body;
    let query = `UPDATE ReservaApartaActividad SET Disponibilidad = @Disponibilidad, FAnterior = @FAnterior WHERE NumReserva = @NumReserva AND CodS = @CodS AND CodAct = @CodAct}`;
    new sql.Request()
        .input('NumReserva', sql.Int, NumReserva)
        .input('CodS', sql.Int, CodS)
        .input('CodAct', sql.Int, CodAct)
        .input('Disponibilidad', sql.Char, Disponibilidad)
        .input('FAnterior', sql.Date, FAnterior)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('ReservaApartaActividad modificado');
            }
        })
})

module.exports = router;