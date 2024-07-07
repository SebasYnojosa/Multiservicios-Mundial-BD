var express = require('express');
var router = express.Router();
var sql = require('../../Database/sqlConnection.js');

router.get('/', (req, res) => {
    new sql.Request().query('SELECT * FROM PagosServicios', (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send(data.recordset);
            console.dir(data.recordset);
        }
    })
})

router.get('/:CodFacturaS/:CodPago', (req, res) => {
    const { CodFacturaS, CodPago } = req.params;
    let query = `SELECT * FROM PagosServicios WHERE CodFacturaS = @CodFacturaS AND CodPago = @CodPago`;
    new sql.Request()
        .input('CodFacturaS', sql.Int, CodFacturaS)
        .input('CodPago', sql.Int, CodPago)
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
    const { CodFacturaS, CodPago, Tipo, Moneda, Telefono, Fecha, Referencia, Modalidad, Monto, NumTarjeta, Banco } = req.body;
    let query = `INSERT INTO PagosServicios VALUES (@CodFacturaS, @CodPago, @Tipo, @Moneda, @Telefono, @Fecha, @Referencia, @Modalidad, @Monto, @NumTarjeta, @Banco)`;
    new sql.Request()
        .input('CodFacturaS', sql.Int, CodFacturaS)
        .input('CodPago', sql.Int, CodPago)
        .input('Tipo', sql.Char, Tipo)
        .input('Moneda', sql.Char, Moneda)
        .input('Telefono', sql.VarChar, Telefono)
        .input('Fecha', sql.Date, Fecha)
        .input('Referencia', sql.VarChar, Referencia)
        .input('Modalidad', sql.VarChar, Modalidad)
        .input('Monto', sql.Decimal, Monto)
        .input('NumTarjeta', sql.VarChar, NumTarjeta)
        .input('Banco', sql.VarChar, Banco)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('Pago agregado');
            }
        })
    
})

router.delete('/:CodFacturaS/:CodPago', (req, res) => {
    const { CodFacturaS, CodPago } = req.params;
    let query = `DELETE FROM PagosServicios WHERE CodFacturaS = @CodFacturaS AND CodPago = @CodPago`;
    new sql.Request()
        .input('CodFacturaS', sql.Int, CodFacturaS)
        .input('CodPago', sql.Int, CodPago)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('Pago eliminado');
            }
        })
})

router.put('/:CodFacturaS/:CodPago', (req, res) => {
    const { CodFacturaS, CodPago } = req.params;
    const { Tipo, Moneda, Telefono, Fecha, Referencia, Modalidad, Monto, NumTarjeta, Banco } = req.body;
    let query = `UPDATE PagosServicios SET Tipo = @Tipo, Moneda = @Moneda, Telefono = @Telefono, Fecha = @Fecha, Referencia = @Referencia, Modalidad = @Modalidad, Monto = @Monto, NumTarjeta = @NumTarjeta, Banco = @Banco WHERE CodFacturaS = @CodFacturaS AND CodPago = @CodPago`;
    new sql.Request()
        .input('CodFacturaS', sql.Int, CodFacturaS)
        .input('CodPago', sql.Int, CodPago)
        .input('Tipo', sql.Char, Tipo)
        .input('Moneda', sql.Char, Moneda)
        .input('Telefono', sql.VarChar, Telefono)
        .input('Fecha', sql.Date, Fecha)
        .input('Referencia', sql.VarChar, Referencia)
        .input('Modalidad', sql.VarChar, Modalidad)
        .input('Monto', sql.Decimal, Monto)
        .input('NumTarjeta', sql.VarChar, NumTarjeta)
        .input('Banco', sql.VarChar, Banco)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('Pago actualizado');
            }
        })
})

module.exports = router;