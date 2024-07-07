var express = require('express');
var router = express.Router();
var sql = require('../../Database/sqlConnection.js');

router.get('/', (req, res) => {
    new sql.Request().query('SELECT * FROM Pagos', (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send(data.recordset);
            console.dir(data.recordset);
        }
    })
})

router.get('/:CodFacturaT/:CodPago', (req, res) => {
    const { CodFacturaT, CodPago } = req.params;
    new sql.Request().query(`SELECT * FROM Pagos WHERE CodFacturaS = ${CodFacturaT} AND CodPago = ${CodPago}` , (err, data) => {
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
    const { CodFacturaT, CodPago, Tipo, Moneda, Telefono, Fecha, Referencia, Modalidad, Monto, NumTarjeta, Banco } = req.body;
    new sql.Request().query(`INSERT INTO Pagos VALUES (${CodFacturaT}, ${CodPago}, '${Tipo}', ${Moneda}, '${Telefono}', ${Fecha}, '${Referencia}, ${Modalidad}, '${Monto}', ${NumTarjeta}, '${Banco})`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('Pago agregado');
        }
    })
})

router.delete('/:CodFacturaT/:CodPago', (req, res) => {
    const { CodFacturaT, CodPago } = req.params;
    new sql.Request().query(`DELETE FROM Pagos WHERE CodFacturaS = ${CodFacturaT} AND CodPago = ${CodPago}`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('Pago eliminado');
        }
    })
})

router.put('/:CodFacturaT/:CodPago', (req, res) => {
    const { CodFacturaT, CodPago } = req.params;
    const { Tipo, Moneda, Telefono, Fecha, Referencia, Modalidad, Monto, NumTarjeta, Banco } = req.body;
    new sql.Request().query(`UPDATE Pagos SET Tipo = '${Tipo}, Moneda = '${Moneda}, Telefono = '${Telefono}, Fecha = '${Fecha}, Referencia = '${Referencia}, Modalidad = '${Modalidad}, Monto = '${Monto}, NumTarjeta = '${NumTarjeta}, Banco = '${Banco} WHERE CodFacturaT = ${CodFacturaT} AND CodPago = ${CodPago}`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('Pago actualizado');
        }
    })
})

module.exports = router;