var express = require('express');
var router = express.Router();
var sql = require('../../Database/sqlConnection.js');

router.get('/', (req, res) => {
    new sql.Request().query('SELECT CodVehiculo, Placa, CICliente, FechaAdq, Nombre, Descripcion, DescripcionT FROM Vehiculos v, Marcas ma, Modelos mo, TipoVehiculos t WHERE t.Idtipo = v.Idtipo AND mo.CodModelo = v.CodModelo AND mo.CodMarca = v.CodMarca AND ma.CodMarca = v.CodMarca', (err, data) => {
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
    let query = `SELECT v.CodVehiculo, v.Placa, v.CICliente, v.FechaAdq, ma.Nombre, mo.Descripcion, t.DescripcionT FROM Vehiculos v, Marcas ma, Modelos mo, TipoVehiculos t WHERE CodVehiculo = @CodVehiculo AND t.Idtipo = v.Idtipo AND mo.CodModelo = v.CodModelo AND mo.CodMarca = v.CodMarca AND ma.CodMarca = v.CodMarca`;
    new sql.Request()
        .input('CodVehiculo', sql.Int, CodVehiculo)
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
    const { CodVehiculo, Placa, CICliente, FechaAdq, CodMarca, CodModelo, Idtipo } = req.body;
    let query = `INSERT INTO Vehiculos VALUES (@CodVehiculo, @Placa, @CICliente, @FechaAdq, @CodMarca, @CodModelo, @Idtipo)`;
    new sql.Request()
        .input('CodVehiculo', sql.Int, CodVehiculo)
        .input('Placa', sql.VarChar, Placa)
        .input('CICliente', sql.Int, CICliente)
        .input('FechaAdq', sql.Date, FechaAdq)
        .input('CodMarca', sql.Int, CodMarca)
        .input('CodModelo', sql.Int, CodModelo)
        .input('Idtipo', sql.Int, Idtipo)
        .query(query, (err, data) => {
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
    let query = `DELETE FROM Vehiculos WHERE CodVehiculo = @CodVehiculo`;
    new sql.Request()
        .input('CodVehiculo', sql.Int, CodVehiculo)
        .query(query, (err, data) => {
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
    const { Placa, CICliente, FechaAdq, CodMarca, CodModelo, Idtipo } = req.body;
    let query = `UPDATE Vehiculos SET Placa = @Placa, CICliente = @CICliente, FechaAdq = @FechaAdq, CodMarca = @CodMarca, CodModelo = @CodModelo, Idtipo = @Idtipo WHERE CodVehiculo = @CodVehiculo}`;
    new sql.Request()
        .input('CodVehiculo', sql.Int, CodVehiculo)
        .input('Placa', sql.VarChar, Placa)
        .input('CICliente', sql.Int, CICliente)
        .input('FechaAdq', sql.Date, FechaAdq)
        .input('CodMarca', sql.Int, CodMarca)
        .input('CodModelo', sql.Int, CodModelo)
        .input('Idtipo', sql.Int, Idtipo)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('Vehiculo actualizado');
            }
        })
})

module.exports = router;