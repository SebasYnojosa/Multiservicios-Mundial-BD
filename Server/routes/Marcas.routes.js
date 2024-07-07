var express = require('express');
var router = express.Router();
var sql = require('../../Database/sqlConnection.js');

router.get('/', (req, res) => {
    new sql.Request().query('SELECT * FROM Marcas', (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send(data.recordset);
            console.dir(data.recordset);
        }
    })
})

router.get('/:CodMarca', (req, res) => {
    const { CodMarca } = req.params;
    let query = `SELECT * FROM Marcas WHERE CodMarca = @CodMarca`;
    new sql.Request()
        .input('CodMarca', sql.Int, CodMarca)
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
    const { CodMarca, Nombre } = req.body;
    let query = `INSERT INTO Marcas (CodMarca, Nombre) VALUES (@CodMarca, @Nombre)`;
    new sql.Request()
        .input('CodMarca', sql.Int, CodMarca)
        .input('Nombre', sql.VarChar, Nombre)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('Marca agregado');
            }
        })
})

router.delete('/:CodMarca', (req, res) => {
    const { CodMarca } = req.params;
    let query = `DELETE FROM Marcas WHERE CodMarca = @CodMarca`;
    new sql.Request()
        .input('CodMarca', sql.Int, CodMarca)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('Marca eliminado');
            }
        })    
})

router.put('/:CodMarca', (req, res) => {
    const { CodMarca } = req.params;
    const { Nombre } = req.body;
    let query = `UPDATE Marcas SET Nombre = @Nombre WHERE CodMarca = @CodMarca`;    
    new sql.Request()
        .input('CodMarca', sql.Int, CodMarca)
        .input('Nombre', sql.VarChar, Nombre)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('Marca actualizado');
            }
        })
})

module.exports = router;