var express = require('express');
var router = express.Router();
var sql = require('../../Database/sqlConnection.js');

router.get('/', (req, res) => {
    new sql.Request().query('SELECT * FROM Vehiculos', (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send(data.recordset);
            console.dir(data.recordset);
        }
    })
})

router.get('/:CodVehiculo', (req, res) => {
    const { CodVehiculo } = req.params;
    new sql.Request().query(`SELECT * FROM Vehiculos WHERE CodVehiculo = ${CodVehiculo}`, (err, data) => {
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
    const { CodVehiculo, Placa, Tipo, CICliente, FechaAdq, CodMarca, CodModelo, Idtipo } = req.body;
    new sql.Request().query(`INSERT INTO Vehiculos VALUES (${CodVehiculo}, '${Placa}', ${Tipo}, '${CICliente}', ${FechaAdq}, '${CodMarca}', ${CodModelo}, '${Idtipo})`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('Vehiculo agregado');
        }
    })
})

router.delete('/:CodVehiculo', (req, res) => {
    const { CodVehiculo } = req.params;
    new sql.Request().query(`DELETE FROM Vehiculos WHERE CodVehiculo = ${CodVehiculo}`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('Vehiculo eliminado');
        }
    })
})

router.put('/:CodVehiculo', (req, res) => {
    const { CodVehiculo } = req.params;
    const { Placa, Tipo, CICliente, FechaAdq, CodMarca, CodModelo, Idtipo } = req.body;
    new sql.Request().query(`UPDATE Vehiculos SET Placa = '${Placa}, Tipo = '${Tipo}, CICliente = '${CICliente}, FechaAdq = '${FechaAdq}, CodMarca = '${CodMarca}, CodModelo = '${CodModelo}, Idtipo = '${Idtipo} WHERE CodVehiculo = ${CodVehiculo}`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('Vehiculo actualizado');
        }
    })
})

module.exports = router;