var express = require('express');
var router = express.Router();
var sql = require('../../Database/sqlConnection.js');

router.get('/', (req, res) => {
    new sql.Request().query('SELECT * FROM Reservas', (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send(data.recordset);
            console.dir(data.recordset);
        }
    })
})

router.get('/:NumReserva', (req, res) => {
    const { NumReserva } = req.params;
    let query = `SELECT * FROM Reservas WHERE NumReserva = @NumReserva`;
    new sql.Request()
        .input('NumReserva', sql.Int, NumReserva)
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
    const { NumReserva, FechaReserva, PorcentajeIni, MontoAbonado, FechaActRes } = req.body;
    let query = `INSERT INTO Reservas VALUES (@NumReserva, @FechaReserva, @PorcentajeIni, @MontoAbonado, @FechaActRes)`;
    new sql.Request()
        .input('NumReserva', sql.Int, NumReserva)
        .input('FechaReserva', sql.Date, FechaReserva)
        .input('PorcentajeIni', sql.Decimal, PorcentajeIni)
        .input('MontoAbonado', sql.Decimal, MontoAbonado)
        .input('FechaActRes', sql.Date, FechaActRes)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('Reserva agregado');
            }
        })
})

router.delete('/:NumReserva', (req, res) => {
    const { NumReserva } = req.params;
    let query = `DELETE FROM Reservas WHERE NumReserva = @NumReserva`;
    new sql.Request()
        .input('NumReserva', sql.Int, NumReserva)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('Reserva eliminado');
            }
        })  
})

router.put('/:NumReserva', (req, res) => {
    const { NumReserva } = req.params;
    const { FechaReserva, PorcentajeIni, MontoAbonado, FechaActRes } = req.body;
    let query = `UPDATE Reservas SET FechaReserva = @FechaReserva, PorcentajeIni = @PorcentajeIni, MontoAbonado = @MontoAbonado, FechaActRes = @FechaActRes WHERE NumReserva = @NumReserva`;
    new sql.Request()
        .input('NumReserva', sql.Int, NumReserva)
        .input('FechaReserva', sql.Date, FechaReserva)
        .input('PorcentajeIni', sql.Decimal, PorcentajeIni)
        .input('MontoAbonado', sql.Decimal, MontoAbonado)
        .input('FechaActRes', sql.Date, FechaActRes)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('Reserva actualizado');
            }
        })
})

module.exports = router;