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
    let query = `SELECT * FROM Mantenimientos WHERE CodMantenimiento = @CodMantenimiento`;
    new sql.Request()
        .input('CodMantenimiento', sql.Int, CodMantenimiento)
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
    const { CodMantenimiento, Descripcion, CodVehiculo, FechaMant } = req.body;
    let query = `INSERT INTO Mantenimientos VALUES (@CodMantenimiento, @Descripcion, @CodVehiculo, @FechaMant)`;
    new sql.Request()
        .input('CodMantenimiento', sql.Int, CodMantenimiento)
        .input('Descripcion', sql.VarChar, Descripcion)
        .input('CodVehiculo', sql.Int, CodVehiculo)
        .input('FechaMant', sql.Date, FechaMant)
        .query(query, (err, data) => {
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
    let query = `DELETE FROM Mantenimientos WHERE CodMantenimiento = @CodMantenimiento}`;
    new sql.Request()
        .input('CodMantenimiento', sql.Int, CodMantenimiento)
        .query(query, (err, data) => {
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
    let query = `UPDATE Mantenimientos SET Descripcion = @Descripcion, CodVehiculo = @CodVehiculo, FechaMant = @FechaMant WHERE CodMantenimiento = @CodMantenimiento`;    
    new sql.Request()
        .input('CodMantenimiento', sql.Int, CodMantenimiento)
        .input('Descripcion', sql.VarChar, Descripcion)
        .input('CodVehiculo', sql.Int, CodVehiculo)
        .input('FechaMant', sql.Date, FechaMant)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('Mantenimiento actualizado');
            }
        })
})

module.exports = router;