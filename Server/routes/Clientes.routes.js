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
    new sql.Request().query(`SELECT * FROM Clientes WHERE CI = ${CI}`, (err, data) => {
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
    const { CI, CodDescuento, Nombre, Email, TelfPrincipal, TelfSecundario } = req.body;
    new sql.Request().query(`INSERT INTO Clientes VALUES (${CI}, '${CodDescuento}', ${Nombre}, '${Email}', ${TelfPrincipal}, '${TelfSecundario}')`, (err, data) => {
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
    new sql.Request().query(`DELETE FROM Clientes WHERE CI = ${CI}`, (err, data) => {
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
    const { CodDescuento, Nombre, Email, TelfPrincipal, TelfSecundario } = req.body;
    new sql.Request().query(`UPDATE Clientes SET CodDescuento = '${CodDescuento}, Nombre = '${Nombre}, Email = '${Email}, TelfPrincipal = '${TelfPrincipal}, TelfSecundario = '${TelfSecundario} WHERE CI = ${CI}`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('Cliente actualizado');
        }
    })
})

module.exports = router;