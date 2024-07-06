var express = require('express');
var router = express.Router();
var sql = require('../../Database/sqlConnection.js');

router.get('/', (req, res) => {
    new sql.Request().query('SELECT * FROM Mantenimientos', (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send(data.recordset);
            console.dir(data.recordset);
        }
    })
})

router.get('/:CodMantenimiento', (req, res) => {
    const { CodMantenimiento } = req.params;
    new sql.Request().query(`SELECT * FROM Mantenimientos WHERE CodMantenimiento = ${CodMantenimiento}`, (err, data) => {
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
    const { CodMantenimiento, Descripcion, CodVehiculo, FechaMant } = req.body;
    new sql.Request().query(`INSERT INTO Mantenimientos VALUES (${CodMantenimiento}, '${Descripcion}', ${CodVehiculo}, '${FechaMant}')`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('Mantenimiento agregado');
        }
    })
})

router.delete('/:CodMantenimiento', (req, res) => {
    const { CodMantenimiento } = req.params;
    new sql.Request().query(`DELETE FROM Mantenimientos WHERE CodMantenimiento = ${CodMantenimiento}`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('Mantenimiento eliminado');
        }
    })
})

router.put('/:CodMantenimiento', (req, res) => {
    const { CodMantenimiento } = req.params;
    const { Descripcion, CodVehiculo, FechaMant } = req.body;
    new sql.Request().query(`UPDATE Mantenimientos SET Descripcion = '${Descripcion}, CodVehiculo = '${CodVehiculo}, FechaMant = '${FechaMant} WHERE CodMantenimiento = ${CodMantenimiento}`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('Mantenimiento actualizado');
        }
    })
})

module.exports = router;