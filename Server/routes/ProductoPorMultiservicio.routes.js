var express = require('express');
var router = express.Router();
var sql = require('../../Database/sqlConnection.js');

router.get('/', (req, res) => {
    new sql.Request().query('SELECT * FROM ProductoPorMultiservicio', (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send(data.recordset);
            console.dir(data.recordset);
        }
    })
})

router.get('/:RIFMult/:CodP/:FechaAjuste', (req, res) => {
    const { RIFMult, CodP, FechaAjuste } = req.params;
    let query = `SELECT * FROM ProductoPorMultiservicio WHERE RIFMult = @RIFMult AND CodP = @CodP AND FechaAjuste = @FechaAjuste`;
    new sql.Request()
        .input('RIFMult', sql.Int, RIFMult)
        .input('CodP', sql.Int, CodP)
        .input('FechaAjuste', sql.Date, FechaAjuste)
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
    const { RIFMult, CodP, FechaAjuste, Existencias, Min, Max, Comentario, TipoAjuste } = req.body;
    let query = `INSERT INTO ProductoPorMultiservicio VALUES (@RIFMult, @CodP, @FechaAjuste, @Existencias, @Min, @Max, @Comentario, @TipoAjuste)`;
    new sql.Request()
        .input('RIFMult', sql.Int, RIFMult)
        .input('CodP', sql.Int, CodP)
        .input('FechaAjuste', sql.Date, FechaAjuste)
        .input('Existencias', sql.Int, Existencias)
        .input('Min', sql.Int, Min)
        .input('Max', sql.Int, Max)
        .input('Comentario', sql.VarChar, Comentario)
        .input('TipoAjuste', sql.Char, TipoAjuste)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('ProductoPorMultiservicio agregado');
            }
        })  
})

router.delete('/:RIFMult/:CodP/:FechaAjuste', (req, res) => {
    const { RIFMult, CodP, FechaAjuste } = req.params;
    let query = `DELETE FROM ProductoPorMultiservicio WHERE RIFMult = @RIFMult AND CodP = @CodP AND FechaAjuste = @FechaAjuste`;
    new sql.Request()
        .input('RIFMult', sql.Int, RIFMult)
        .input('CodP', sql.Int, CodP)
        .input('FechaAjuste', sql.Date, FechaAjuste)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('ProductoPorMultiservicio eliminado');
            }
        })
})

router.put('/:RIFMult/:CodP/:FechaAjuste', (req, res) => {
    const { RIFMult, CodP, FechaAjuste } = req.params;
    const { Existencias, Min, Max, Comentario, TipoAjuste } = req.body;
    let query = `UPDATE ProductoPorMultiservicio SET Existencias = @Existencias, Min = @Min, Max = @Max, Comentario = @Comentario, TipoAjuste = @TipoAjuste WHERE RIFMult = @RIFMult AND CodP = @CodP AND FechaAjuste = @FechaAjuste`;
    new sql.Request()
        .input('RIFMult', sql.Int, RIFMult)
        .input('CodP', sql.Int, CodP)
        .input('FechaAjuste', sql.Date, FechaAjuste)
        .input('Existencias', sql.Int, Existencias)
        .input('Min', sql.Int, Min)
        .input('Max', sql.Int, Max)
        .input('Comentario', sql.VarChar, Comentario)
        .input('TipoAjuste', sql.Char, TipoAjuste)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('ProductoPorMultiservicio actualizado');
            }
        })
})

module.exports = router;