var express = require('express');
var router = express.Router();
var sql = require('../../Database/sqlConnection.js');

router.get('/', (req, res) => {
    new sql.Request().query('SELECT * FROM ProductoPorModelo', (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send(data.recordset);
            console.dir(data.recordset);
        }
    })
})

router.get('/:CodMarca/:CodModelo/:CodP', (req, res) => {
    const { CodMarca, CodModelo, CodP } = req.params;
    let query = `SELECT * FROM ProductoPorModelo WHERE CodMarca = @CodMarca AND CodModelo = @CodModelo AND CodP = @CodP`;    
    new sql.Request()
        .input('CodMarca', sql.Int, CodMarca)
        .input('CodModelo', sql.Int, CodModelo)
        .input('CodP', sql.Int, CodP)
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
    const { CodMarca, CodModelo, CodP, Cantidad } = req.body;
    let query = `INSERT INTO ProductoPorModelo VALUES (@CodMarca, @CodModelo, @CodP, @Cantidad)`;
    new sql.Request()
        .input('CodMarca', sql.Int, CodMarca)
        .input('CodModelo', sql.Int, CodModelo)
        .input('CodP', sql.Int, CodP)
        .input('Cantidad', sql.Int, Cantidad)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('ProductoPorModelo agregado');
            }
        })
})

router.delete('/:CodMarca/:CodModelo/:CodP', (req, res) => {
    const { CodMarca, CodModelo, CodP } = req.params;
    let query = `DELETE FROM ProductoPorModelo WHERE CodMarca = @CodMarca AND CodModelo = @CodModelo AND CodP = @CodP`;
    new sql.Request()
        .input('CodMarca', sql.Int, CodMarca)
        .input('CodModelo', sql.Int, CodModelo)
        .input('CodP', sql.Int, CodP)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('ProductoPorModelo eliminado');
            }
        })  
})

router.put('/:CodMarca/:CodModelo/:CodP', (req, res) => {
    const { CodMarca, CodModelo, CodP } = req.params;
    const { Cantidad } = req.body;
    let query = `UPDATE ProductoPorModelo SET Cantidad = @Cantidad WHERE CodMarca = @CodMarca AND CodModelo = @CodModelo AND CodP = @CodP`;
    new sql.Request()
        .input('CodMarca', sql.Int, CodMarca)
        .input('CodModelo', sql.Int, CodModelo)
        .input('CodP', sql.Int, CodP)
        .input('Cantidad', sql.Int, Cantidad)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('ProductoPorModelo actualizado');
            }
        })
})

module.exports = router;