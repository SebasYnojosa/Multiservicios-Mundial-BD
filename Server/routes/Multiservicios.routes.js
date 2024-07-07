var express = require('express');
var router = express.Router();
var sql = require('../../Database/sqlConnection.js');

router.get('/', (req, res) => {
    new sql.Request().query('SELECT * FROM Multiservicios', (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send(data.recordset);
            console.dir(data.recordset);
        }
    })
})

router.get('/:RIF', (req, res) => {
    const { RIF } = req.params;
    let query = `SELECT * FROM Multiservicios WHERE RIF = @RIF`;
    new sql.Request()
        .input('RIF', sql.Int, RIF)
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
    const { RIF, Nombre, Ciudad, CIEncargado } = req.body;
    let query = `INSERT INTO Multiservicios (RIF, Nombre, Ciudad, CIEncargado) VALUES (@RIF, @Nombre, @Ciudad, @CIEncargado)`;
    new sql.Request()
        .input('RIF', sql.Int, RIF)
        .input('Nombre', sql.VarChar, Nombre)
        .input('Ciudad', sql.VarChar, Ciudad)
        .input('CIEncargado', sql.Int, CIEncargado)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('Multiservicio agregado');
            }
        })
})

router.delete('/:RIF', (req, res) => {
    const { RIF } = req.params;
    let query = `DELETE FROM Multiservicios WHERE RIF = @RIF`;
    new sql.Request()
        .input('RIF', sql.Int, RIF)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('Multiservicio eliminado');
            }
        })
})

router.put('/:RIF', (req, res) => {
    const { RIF } = req.params;
    const { Nombre, Ciudad, CIEncargado } = req.body;
    let query = `UPDATE Multiservicios SET Nombre = @Nombre, Ciudad = @Ciudad, CIEncargado = @CIEncargado WHERE RIF = @RIF`;
    new sql.Request()
        .input('RIF', sql.Int, RIF)
        .input('Nombre', sql.VarChar, Nombre)
        .input('Ciudad', sql.VarChar, Ciudad)
        .input('CIEncargado', sql.Int, CIEncargado)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('Multiservicio actualizado');
            }
        })
})

// Ruta para agregar encargado a un multiservicio
router.put('/encargado/:RIF', (req, res) => {
    const { RIF } = req.params;
    const { CIEncargado, FInicioEncargado } = req.body;
    let query = `UPDATE Multiservicios SET CIEncargado = @CIEncargado, FInicioEncargado = @FInicioEncargado  WHERE RIF = @RIF`;
    new sql.Request()
        .input('RIF', sql.Int, RIF)
        .input('CIEncargado', sql.Int, CIEncargado)
        .input('FInicioEncargado', sql.DateTime, FInicioEncargado)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
                res.status(500).send('Error al agregar encargado al multiservicio');
            }
            else {
                res.send('Encargado agregado al multiservicio');
            }
        })
})

module.exports = router;