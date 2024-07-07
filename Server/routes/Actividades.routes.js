var express = require('express');
var router = express.Router();
var sql = require('../../Database/sqlConnection.js');

router.get('/', (req, res) => {
    new sql.Request().query('SELECT * FROM Actividades', (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send(data.recordset);
            console.dir(data.recordset);
        }
    })
})

router.get('/:CodServicio/:CodActividad', (req, res) => {
    const { CodServicio, CodActividad } = req.params;
    let query = `SELECT * FROM Actividades WHERE CodServicio = @CodServicio AND CodActividad = @CodActividad`;
    new sql.Request()
        .input('CodServicio', sql.Int, CodServicio)
        .input('CodActividad', sql.Int, CodActividad)
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
    const { CodServicio, CodActividad, DescA, Costo, TiempoMin, CodMantenimiento } = req.body;
    let query = `INSERT INTO Actividades VALUES (@CodServicio, @CodActividad, @DescA, @Costo, @TiempoMin, @CodMantenimiento)`;
    new sql.Request()
        .input('CodServicio', sql.Int, CodServicio)
        .input('CodActividad', sql.Int, CodActividad)
        .input('DescA', sql.VarChar, DescA)
        .input('Costo', sql.Decimal, Costo)
        .input('TiempoMin', sql.DateTime, TiempoMin)
        .input('CodMantenimiento', sql.Int, CodMantenimiento)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('Actividad agregado');
            }
        })
})

router.delete('/:CodServicio/:CodActividad', (req, res) => {
    const { CodServicio, CodActividad } = req.params;
    let query = `DELETE FROM Actividades WHERE CodServicio = @CodServicio AND CodActividad = @CodActividad`;
    new sql.Request()
        .input('CodServicio', sql.Int, CodServicio)
        .input('CodActividad', sql.Int, CodActividad)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('Actividad eliminado');
            }
        })
})

router.put('/:CodServicio/:CodActividad', (req, res) => {
    const { CodServicio, CodActividad } = req.params;
    const { DescA, Costo, TiempoMin, CodMantenimiento } = req.body;
    let query = `UPDATE Actividades SET DescA = @DescA, Costo = @Costo, TiempoMin = @TiempoMin, CodMantenimiento = @CodMantenimiento WHERE CodServicio = @CodServicio AND CodActividad = @CodActividad`;
    new sql.Request()
        .input('CodServicio', sql.Int, CodServicio)
        .input('CodActividad', sql.Int, CodActividad)
        .input('DescA', sql.VarChar, DescA)
        .input('Costo', sql.Decimal, Costo)
        .input('TiempoMin', sql.DateTime, TiempoMin)
        .input('CodMantenimiento', sql.Int, CodMantenimiento)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('Actividad actualizado');
            }
        })
})

module.exports = router;