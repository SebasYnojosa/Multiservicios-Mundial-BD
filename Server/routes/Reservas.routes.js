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
    new sql.Request().query(`SELECT * FROM Reservas WHERE NumReserva = ${NumReserva}`, (err, data) => {
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
    new sql.Request().query(`INSERT INTO Reservas VALUES (${NumReserva}, '${FechaReserva}', ${PorcentajeIni}, '${MontoAbonado}', ${FechaActRes})`, (err, data) => {
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
    new sql.Request().query(`DELETE FROM Reservas WHERE NumReserva = ${NumReserva}`, (err, data) => {
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
    new sql.Request().query(`UPDATE Reservas SET FechaReserva = '${FechaReserva}, PorcentajeIni = '${PorcentajeIni}, MontoAbonado = '${MontoAbonado}, FechaActRes = '${FechaActRes} WHERE NumReserva = ${NumReserva}`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('Reserva actualizado');
        }
    })
})

module.exports = router;