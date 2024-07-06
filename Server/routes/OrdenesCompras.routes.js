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
    new sql.Request().query(`SELECT * FROM OrdenesCompras WHERE CodOrdenC = ${CodOrdenC}`, (err, data) => {
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
    new sql.Request().query(`INSERT INTO OrdenesCompras VALUES (${CodOrdenC}, '${CodReq}', ${CantidadComprar}, '${PrecioCompra}', ${CantidadEntregada}, '${RIFProv}', ${CodFacturaP})`, (err, data) => {
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
    new sql.Request().query(`DELETE FROM OrdenesCompras WHERE CodOrdenC = ${CodOrdenC}`, (err, data) => {
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
    new sql.Request().query(`UPDATE OrdenesCompras SET CodReq = '${CodReq}, CantidadComprar = '${CantidadComprar}, PrecioCompra = '${PrecioCompra}, CantidadEntregada = '${CantidadEntregada}, RIFProv = '${RIFProv}, CodFacturaP = '${CodFacturaP} WHERE CodOrdenC = ${CodOrdenC}`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('OrdenCompra actualizado');
        }
    })
})

module.exports = router;