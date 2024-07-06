var express = require('express');
var router = express.Router();
var sql = require('../../Database/sqlConnection.js');

router.get('/', (req, res) => {
    new sql.Request().query('SELECT * FROM SolicitudServicios', (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send(data.recordset);
            console.dir(data.recordset);
        }
    })
})

router.get('/:CodFicha', (req, res) => {
    const { CodFicha } = req.params;
    new sql.Request().query(`SELECT * FROM SolicitudServicios WHERE CodFicha = ${CodFicha}`, (err, data) => {
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
    const { CodFicha, NombreResponsable, CIPersRet, NombrePersRet, CodVehiculo, Costo, CantAct } = req.body;
    new sql.Request().query(`INSERT INTO SolicitudServicios VALUES (${CodFicha}, '${NombreResponsable}', ${CIPersRet}, '${NombrePersRet}', ${CodVehiculo}, '${Costo}', ${CantAct})`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('SolicitudServicio agregado');
        }
    })
})

router.delete('/:CodFicha', (req, res) => {
    const { CodFicha } = req.params;
    new sql.Request().query(`DELETE FROM SolicitudServicios WHERE CodFicha = ${CodFicha}`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('SolicitudServicio eliminado');
        }
    })
})

router.put('/:CodFicha', (req, res) => {
    const { CodFicha } = req.params;
    const { NombreResponsable, CIPersRet, NombrePersRet, CodVehiculo, Costo, CantAct } = req.body;
    new sql.Request().query(`UPDATE SolicitudServicios SET NombreResponsable = '${NombreResponsable}, CIPersRet = '${CIPersRet}, NombrePersRet = '${NombrePersRet}, CodVehiculo = '${CodVehiculo}, Costo = '${Costo}, CantAct = '${CantAct} WHERE CodFicha = ${CodFicha}`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('SolicitudServicio actualizado');
        }
    })
})

module.exports = router;