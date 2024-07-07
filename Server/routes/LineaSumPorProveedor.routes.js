var express = require('express');
var router = express.Router();
var sql = require('../../Database/sqlConnection.js');

router.get('/', (req, res) => {
    new sql.Request().query('SELECT * FROM LineaSumPorProveedor', (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send(data.recordset);
            console.dir(data.recordset);
        }
    })
})

router.get('/:RIFProveedor/:CodLinea', (req, res) => {
    const { RIFProveedor, CodLinea } = req.params;
    let query = `SELECT * FROM LineaSumPorProveedor WHERE RIFProveedor = @RIFProveedor AND CodLinea = @CodLinea`;
    new sql.Request()
        .input('RIFProveedor', sql.Int, RIFProveedor)
        .input('CodLinea', sql.Int, CodLinea)
        .query(query, (err,data) => {
            if(err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send(data.recordset);
                console.dir(data.recordset);
            }
        })
})

router.post('/', (req, res) => {
    const { RIFProveedor, CodLinea } = req.body;
    let query = `INSERT INTO LineaSumPorProveedor VALUES (@RIFProveedor, @CodLinea)`;
    new sql.Request()
        .input('RIFProveedor', sql.Int, RIFProveedor)
        .input('CodLinea', sql.Int, CodLinea)
        .query(query, (err, data) => {
            if(err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('LineaSumPorProveedor agregado');
            }
        })
})

router.delete('/:RIFProveedor/:CodLinea', (req, res) => {
    const { RIFProveedor, CodLinea } = req.params;
    let query = `DELETE FROM LineaSumPorProveedor WHERE RIFProveedor = @RIFProveedor AND CodLinea = @CodLinea`;
    new sql.Request()
        .input('RIFProveedor', sql.Int, RIFProveedor)
        .input('CodLinea', sql.Int, CodLinea)
        .query(query, (err, data) => {
            if(err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('LineaSumPorProveedor eliminado');
            }
        })
})

module.exports = router;