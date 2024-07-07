var express = require('express');
var router = express.Router();
var sql = require('../../Database/sqlConnection.js');

router.get('/', (req, res) => {
    new sql.Request().query('SELECT * FROM OrdenesCompras', (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send(data.recordset);
            console.dir(data.recordset);
        }
    })
})

router.get('/:CodOrdenC', (req, res) => {
    const { CodOrdenC } = req.params;
    let query = `SELECT * FROM OrdenesCompras WHERE CodOrdenC = @CodOrdenC`;
    new sql.Request()
        .input('CodOrdenC', sql.Int, CodOrdenC)
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
    const { CodOrdenC, CodReq, CantidadComprar, PrecioCompra, CantidadEntregada, RIFProv, CodFacturaP } = req.body;
    let query = `INSERT INTO OrdenesCompras VALUES (@CodOrdenC, @CodReq, @CantidadComprar, @PrecioCompra, @CantidadEntregada, @RIFProv, @CodFacturaP)`;
    new sql.Request()
        .input('CodOrdenC', sql.Int, CodOrdenC)
        .input('CodReq', sql.Int, CodReq)
        .input('CantidadComprar', sql.Int, CantidadComprar)
        .input('PrecioCompra', sql.Decimal, PrecioCompra)
        .input('CantidadEntregada', sql.Int, CantidadEntregada)
        .input('RIFProv', sql.Int, RIFProv)
        .input('CodFacturaP', sql.Int, CodFacturaP)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('OrdenCompra agregado');
            }
        })
})

router.delete('/:CodOrdenC', (req, res) => {
    const { CodOrdenC } = req.params;
    let query = `DELETE FROM OrdenesCompras WHERE CodOrdenC = @CodOrdenC`;
    new sql.Request()
        .input('CodOrdenC', sql.Int, CodOrdenC)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('OrdenCompra eliminado');
            }
        })
})

router.put('/:CodOrdenC', (req, res) => {
    const { CodOrdenC } = req.params;
    const { CodReq, CantidadComprar, PrecioCompra, CantidadEntregada, RIFProv, CodFacturaP } = req.body;
    let query = `UPDATE OrdenesCompras SET CodReq = @CodReq, CantidadComprar = @CantidadComprar, PrecioCompra = @PrecioCompra, CantidadEntregada = @CantidadEntregada, RIFProv = @RIFProv, CodFacturaP = @CodFacturaP WHERE CodOrdenC = @CodOrdenC`;
    new sql.Request()
        .input('CodOrdenC', sql.Int, CodOrdenC)
        .input('CodReq', sql.Int, CodReq)
        .input('CantidadComprar', sql.Int, CantidadComprar)
        .input('PrecioCompra', sql.Decimal, PrecioCompra)
        .input('CantidadEntregada', sql.Int, CantidadEntregada)
        .input('RIFProv', sql.Int, RIFProv)
        .input('CodFacturaP', sql.Int, CodFacturaP)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('OrdenCompra actualizado');
            }
        })
})

module.exports = router;