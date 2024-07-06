var express = require('express');
var router = express.Router();
var sql = require('../../Database/sqlConnection.js');

router.get('/', (req, res) => {
    new sql.Request().query('SELECT * FROM Descuentos', (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send(data.recordset);
            console.dir(data.recordset);
        }
    })
})

router.get('/:CodDescuento', (req, res) => {
    const { CodDescuento } = req.params;
    new sql.Request().query(`SELECT * FROM Descuentos WHERE CodDescuento = ${CodDescuento}`, (err, data) => {
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
    const { CodDescuento, Valor, MinVisita, MaxVisita } = req.body;
    new sql.Request().query(`INSERT INTO Descuentos VALUES (${CodDescuento}, '${Valor}', ${MinVisita}, '${MaxVisita}')`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('Descuento agregado');
        }
    })
})

router.delete('/:CodDescuento', (req, res) => {
    const { CodDescuento } = req.params;
    new sql.Request().query(`DELETE FROM Descuentos WHERE CodDescuento = ${CodDescuento}`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('Descuento eliminado');
        }
    })
})

router.put('/:CodDescuento', (req, res) => {
    const { CodDescuento } = req.params;
    const { Valor, MinVisita, MaxVisita } = req.body;
    new sql.Request().query(`UPDATE Descuentos SET Valor = '${Valor}, MinVisita = '${MinVisita}, MaxVisita = '${MaxVisita} WHERE CodDescuento = ${CodDescuento}`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('Descuento actualizado');
        }
    })
})

module.exports = router;