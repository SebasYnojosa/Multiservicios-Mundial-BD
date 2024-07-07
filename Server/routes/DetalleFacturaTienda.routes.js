var express = require('express');
var router = express.Router();
var sql = require('../../Database/sqlConnection.js');

router.get('/', (req, res) => {
    new sql.Request().query('SELECT * FROM DetalleFacturaTienda', (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send(data.recordset);
            console.dir(data.recordset);
        }
    })
})

router.get('/:CodF/:CodP', (req, res) => {
    const { CodF, CodP } = req.params;
    let query = `SELECT * FROM DetalleFacturaTienda WHERE CodF = @CodF AND CodP = @CodP`;
    new sql.Request()
        .input('CodF', sql.Int, CodF)
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
    const { CodF, CodP } = req.body;
    let query = `INSERT INTO DetalleFacturaTienda VALUES (@CodF, @CodP)`;
    new sql.Request()
        .input('CodF', sql.Int, CodF)
        .input('CodP', sql.Int, CodP)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('DetalleFacturaTienda agregado');
            }
        })
})

router.delete('/:CodF/:CodP', (req, res) => {
    const { CodF, CodP } = req.params;
    let query = `DELETE FROM DetalleFacturaTienda WHERE CodF = @CodF AND CodP = @CodP`;
    new sql.Request()
        .input('CodF', sql.Int, CodF)
        .input('CodP', sql.Int, CodP)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else { 
                res.send('DetalleFacturaTienda eliminado');
            }
        })
})

module.exports = router;