var express = require('express');
var router = express.Router();
var sql = require('../../Database/sqlConnection.js');

router.get('/', (req, res) => {
    new sql.Request().query('SELECT p.CI, p.NombreC, p.Direccion, p.Telefono, p.Salario, m.Nombre, COUNT(s.CIPersonal) AS CantidadServicios FROM Personal p, Multiservicios m, Servicios s WHERE m.RIF = p.RIFMultiServ AND s.CIPersonal = p.CI GROUP BY p.CI, p.NombreC, p.Direccion, p.Telefono, p.Salario, m.Nombre', (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send(data.recordset);
            console.dir(data.recordset);
        }
    })
})

router.get('/:CI', (req, res) => {
    const { CI } = req.params;
    let query = `SELECT p.CI, p.NombreC, p.Direccion, p.Telefono, p.Salario, m.Nombre, COUNT(s.CIPersonal) AS CantidadServicios FROM Personal p, Multiservicios m, Servicios s WHERE CI = @CI AND m.RIF = p.RIFMultiServ AND s.CIPersonal = p.CI GROUP BY p.CI, p.NombreC, p.Direccion, p.Telefono, p.Salario, m.Nombre`;
    new sql.Request()
        .input('CI', sql.Int, CI)
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
    const { CI, NombreC, Direccion, Telefono, Salario, RIFMultiserv } = req.body;
    let query = `INSERT INTO Personal VALUES (@CI, @NombreC, @Direccion, @Telefono, @Salario, @RIFMultiserv)`;
    new sql.Request()
        .input('CI', sql.Int, CI)
        .input('NombreC', sql.VarChar, NombreC)
        .input('Direccion', sql.VarChar, Direccion)
        .input('Telefono', sql.VarChar, Telefono)
        .input('Salario', sql.Decimal, Salario)
        .input('RIFMultiserv', sql.Int, RIFMultiserv)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('Personal agregado');
            }
        })
})

router.delete('/:CI', (req, res) => {
    const { CI } = req.params;
    let query = `DELETE FROM Personal WHERE CI = @CI`;
    new sql.Request()
        .input('CI', sql.Int, CI)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('Personal eliminado');
            }
        })
})

router.put('/:CI', (req, res) => {
    const { CI } = req.params;
    const { NombreC, Direccion, Telefono, Salario, RIFMultiServ } = req.body;
    let query = `UPDATE Personal SET NombreC = @NombreC, Direccion = @Direccion, Telefono = @Telefono, Salario = @Salario, RIFMultiServ = @RIFMultiServ WHERE CI = @CI`;
    new sql.Request()
        .input('CI', sql.Int, CI)
        .input('NombreC', sql.VarChar, NombreC)
        .input('Direccion', sql.VarChar, Direccion)
        .input('Telefono', sql.VarChar, Telefono)
        .input('Salario', sql.Decimal, Salario)
        .input('RIFMultiServ', sql.Int, RIFMultiServ)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('Personal actualizado');
            }
        })
})

module.exports = router;