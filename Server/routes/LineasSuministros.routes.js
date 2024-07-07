var express = require('express');
var router = express.Router();
var sql = require('../../Database/sqlConnection.js');

router.get('/', (req, res) => {
    new sql.Request().query('SELECT * FROM LineasSuministros', (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send(data.recordset);
            console.dir(data.recordset);
        }
    })
})

router.get('/:CodLinea', (req, res) => {
    const { CodLinea } = req.params;
    let query = `SELECT * FROM LineasSuministros WHERE CodLinea = @CodLinea`;
    new sql.Request()
        .input('CodLinea', sql.Int, CodLinea)
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
    const { CodLinea, Descripcion } = req.body;
    let query = `INSERT INTO LineasSuministros (CodLinea, Descripcion) VALUES (@CodLinea, @Descripcion)`;
    new sql.Request()
        .input('CodLinea', sql.Int, CodLinea)
        .input('Descripcion', sql.VarChar, Descripcion)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('LineaSuministro agregado');
            }
        })
})

router.delete('/:CodLinea', (req, res) => {
    const { CodLinea } = req.params;
    let query = `DELETE FROM LineasSuministros WHERE CodLinea = @CodLinea`;
    new sql.Request()
        .input('CodLinea', sql.Int, CodLinea)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('LineaSuministro eliminado');
            }
        })
})

router.put('/:CodLinea', (req, res) => {
    const { CodLinea } = req.params;
    const { Descripcion } = req.body;
    let query = `UPDATE LineasSuministros SET Descripcion = @Descripcion WHERE CodLinea = @CodLinea`;
    new sql.Request()
        .input('CodLinea', sql.Int, CodLinea)
        .input('Descripcion', sql.VarChar, Descripcion)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('LineaSuministro actualizado');
            }
        })  
})

module.exports = router;