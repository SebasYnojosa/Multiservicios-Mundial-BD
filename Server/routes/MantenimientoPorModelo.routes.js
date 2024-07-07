var express = require('express');
var router = express.Router();
var sql = require('../../Database/sqlConnection.js');

router.get('/', (req, res) => {
    new sql.Request().query('SELECT * FROM MantenimientoPorModelo', (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send(data.recordset);
            console.dir(data.recordset);
        }
    })
})

router.get('/:CodMarca/:CodModelo/:CodMantenimiento/:TiempoUso/:Kilometraje', (req, res) => {
    const { CodMarca, CodModelo, CodMantenimiento, TiempoUso, Kilometraje } = req.params;
    let query = `SELECT * FROM MantenimientoPorModelo WHERE CodMarca = @CodMarca AND CodModelo = @CodModelo AND CodMantenimiento = @CodMantenimiento AND TiempoUso = @TiempoUso AND Kilometraje = @Kilometraje`;
    new sql.Request()
        .input('CodMarca', sql.Int, CodMarca)
        .input('CodModelo', sql.Int, CodModelo)
        .input('CodMantenimiento', sql.Int, CodMantenimiento)
        .input('TiempoUso', sql.Time, TiempoUso)
        .input('Kilometraje', sql.Int, Kilometraje)
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
    const { CodMarca, CodModelo, CodMantenimiento, TiempoUso, Kilometraje } = req.body;
    let query = `INSERT INTO MantenimientoPorModelo VALUES (@CodMarca, @CodModelo, @CodMantenimiento, @TiempoUso, @Kilometraje)`;
    new sql.Request()
        .input('CodMarca', sql.Int, CodMarca)
        .input('CodModelo', sql.Int, CodModelo)
        .input('CodMantenimiento', sql.Int, CodMantenimiento)
        .input('TiempoUso', sql.Time, TiempoUso)
        .input('Kilometraje', sql.Int, Kilometraje)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('MantenimientoPorModelo agregado');
            }
        })
})

router.delete('/:CodMarca/:CodModelo/:CodMantenimiento/:TiempoUso/:Kilometraje', (req, res) => {
    const { CodMarca, CodModelo, CodMantenimiento, TiempoUso, Kilometraje } = req.params;
    let query = `DELETE FROM MantenimientoPorModelo WHERE CodMarca = @CodMarca AND CodModelo = @CodModelo AND CodMantenimiento = @CodMantenimiento AND TiempoUso = @TiempoUso AND Kilometraje = @Kilometraje`;
    new sql.Request()
        .input('CodMarca', sql.Int, CodMarca)
        .input('CodModelo', sql.Int, CodModelo)
        .input('CodMantenimiento', sql.Int, CodMantenimiento)
        .input('TiempoUso', sql.Time, TiempoUso)
        .input('Kilometraje', sql.Int, Kilometraje)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('MantenimientoPorModelo eliminado');
            }
        })
})

module.exports = router;