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

router.get('/:CodMarcaCodModeloCodMantenimientoTiempoUsoKilometraje', (req, res) => {
    const { CodMarca, CodModelo, CodMantenimiento, TiempoUso, Kilometraje } = req.params;
    new sql.Request().query(`SELECT * FROM MantenimientoPorModelo WHERE CodMarca = ${CodMarca} AND CodModelo = ${CodModelo} AND CodMantenimiento = ${CodMantenimiento} AND TiempoUso = ${TiempoUso} AND Kilometraje = ${Kilometraje}`, (err, data) => {
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
    new sql.Request().query(`INSERT INTO MantenimientoPorModelo VALUES (${CodMarca}, '${CodModelo}', ${CodMantenimiento}, '${TiempoUso}', ${Kilometraje})`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('MantenimientoPorModelo agregado');
        }
    })
})

router.delete('/:CodMarcaCodModeloCodMantenimientoTiempoUsoKilometraje', (req, res) => {
    const { CodMarca, CodModelo, CodMantenimiento, TiempoUso, Kilometraje } = req.params;
    new sql.Request().query(`DELETE FROM MantenimientoPorModelo WHERE CodMarca = ${CodMarca} AND CodModelo = ${CodModelo} AND CodMantenimiento = ${CodMantenimiento} AND TiempoUso = ${TiempoUso} AND Kilometraje = ${Kilometraje}`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('MantenimientoPorModelo eliminado');
        }
    })
})

module.exports = router;