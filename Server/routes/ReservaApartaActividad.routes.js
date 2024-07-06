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

router.get('/:NumReservaCodSCodAct', (req, res) => {
    const { NumReserva, CodS, CodAct } = req.params;
    new sql.Request().query(`SELECT * FROM ReservaApartaActividad WHERE NumReserva = ${NumReserva} AND CodS = ${CodS} AND CodAct = ${CodAct}`, (err, data) => {
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
    new sql.Request().query(`INSERT INTO ReservaApartaActividad VALUES (${NumReserva}, '${CodS}', ${CodAct}, '${Disponibilidad}', ${FAnterior})`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('ReservaApartaActividad agregado');
        }
    })
})

router.delete('/:NumReservaCodSCodAct', (req, res) => {
    const { NumReserva, CodS, CodAct } = req.params;
    new sql.Request().query(`DELETE FROM ReservaApartaActividad WHERE NumReserva = ${NumReserva} AND CodS = ${CodS} AND CodAct = ${CodAct}`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('ReservaApartaActividad eliminado');
        }
    })
})

router.put('/:NumReservaCodSCodAct', (req, res) => {
    const { NumReserva, CodS, CodAct } = req.params;
    const { Disponibilidad, FAnterior } = req.body;
    new sql.Request().query(`UPDATE ReservaApartaActividad SET Disponibilidad = '${Disponibilidad}, FAnterior = '${FAnterior}' WHERE NumReserva = ${NumReserva} AND CodS = ${CodS} AND CodAct = ${CodAct}`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('ReservaApartaActividad actualizado');
        }
    })
})

module.exports = router;