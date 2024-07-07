var express = require('express');
var router = express.Router();
var sql = require('../../Database/sqlConnection.js');

router.get('/', (req, res) => {
    new sql.Request().query('SELECT * FROM Clientes', (err, data) => {
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
    let query = `SELECT * FROM Clientes WHERE CI = @CI`;
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
    const { CI, Nombre, Email, TelfPrincipal, TelfSecundario } = req.body;
    let query = `INSERT INTO Clientes (CI, Nombre, Email, TelfPrincipal, TelfSecundario) VALUES (@CI, @Nombre, @Email, @TelfPrincipal, @TelfSecundario)`;
    new sql.Request()
        .input('CI', sql.Int, CI)
        .input('Nombre', sql.VarChar, Nombre)
        .input('Email', sql.VarChar, Email)
        .input('TelfPrincipal', sql.VarChar, TelfPrincipal)
        .input('TelfSecundario', sql.VarChar, TelfSecundario)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('Cliente agregado');
            }
        })
})

router.delete('/:CI', (req, res) => {
    const { CI } = req.params;
    let query = `DELETE FROM Clientes WHERE CI = @CI`;
    new sql.Request()
        .input('CI', sql.Int, CI)
        .query(query, (err, data) => {  
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('Cliente eliminado');
            }
        })
})

router.put('/:CI', (req, res) => {
    const { CI } = req.params;
    const { Nombre, Email, TelfPrincipal, TelfSecundario } = req.body;
    let query = `UPDATE Clientes SET Nombre = @Nombre, Email = @Email, TelfPrincipal = @TelfPrincipal, TelfSecundario = @TelfSecundario WHERE CI = @CI`;
    new sql.Request()
        .input('CI', sql.Int, CI)
        .input('Nombre', sql.VarChar, Nombre)
        .input('Email', sql.VarChar, Email)
        .input('TelfPrincipal', sql.VarChar, TelfPrincipal)
        .input('TelfSecundario', sql.VarChar, TelfSecundario)
        .query(query, (err, data) => {  
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('Cliente actualizado');
            }
        })
})

module.exports = router;