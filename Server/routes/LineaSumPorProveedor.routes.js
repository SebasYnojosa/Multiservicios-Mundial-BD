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

router.get('/:RIFProveedorCodLinea', (req, res) => {
    const { RIFProveedor, CodLinea } = req.params;
    new sql.Request().query(`SELECT * FROM LineaSumPorProveedor WHERE RIFProveedor = ${RIFProveedor} AND CodLinea = ${CodLinea}`, (err, data) => {
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
    const { RIFProveedor, CodLinea } = req.body;
    new sql.Request().query(`INSERT INTO LineaSumPorProveedor VALUES (${RIFProveedor}, '${CodLinea}'`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('LineaSumPorProveedor agregado');
        }
    })
})

router.delete('/:RIFProveedorCodLinea', (req, res) => {
    const { RIFProveedor, CodLinea } = req.params;
    new sql.Request().query(`DELETE FROM LineaSumPorProveedor WHERE RIFProveedor = ${RIFProveedor} AND CodLinea = ${CodLinea}`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('LineaSumPorProveedor eliminado');
        }
    })
})

module.exports = router;