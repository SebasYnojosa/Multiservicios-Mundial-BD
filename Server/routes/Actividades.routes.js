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
    console.log(CodServicio + '&' + CodActividad);
    new sql.Request().query(`SELECT * FROM Actividades WHERE CodServicio = ${CodServicio} AND CodActividad = ${CodActividad}` , (err, data) => {
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
    const { CodServicio, CodActividad, DescA, Costo, TiempoMin, CodFichaSS, CantA, CostoAF, CodMantenimiento } = req.body;
    new sql.Request().query(`INSERT INTO Actividades VALUES (${CodServicio}, '${CodActividad}', ${DescA}, '${Costo}', ${TiempoMin}, '${CodFichaSS}', ${CantA}, '${CostoAF}, ${CodMantenimiento})`, (err, data) => {
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
    new sql.Request().query(`DELETE FROM Actividades WHERE CodServicio = ${CodServicio} AND CodActividad = ${CodActividad}`, (err, data) => {
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
    const { DescA, Costo, TiempoMin, CodFichaSS, CantA, CostoAF, CodMantenimiento } = req.body;
    new sql.Request().query(`UPDATE Actividades SET DescA = '${DescA}, Costo = '${Costo}, TiempoMin = '${TiempoMin}, CodFichaSS = '${CodFichaSS}, CantA = '${CantA}, CostoAF = '${CostoAF}, CodMantenimiento = '${CodMantenimiento} WHERE CodServicio = ${CodServicio} AND CodActividad = ${CodActividad}`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('Actividad actualizado');
        }
    })
})

module.exports = router;