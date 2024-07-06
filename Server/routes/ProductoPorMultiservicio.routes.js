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
    new sql.Request().query(`SELECT * FROM ProductoPorMultiservicio WHERE RIFMult = ${RIFMult} AND CodP = ${CodP} AND FechaAjuste = ${FechaAjuste}` , (err, data) => {
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
    new sql.Request().query(`INSERT INTO ProductoPorMultiservicio VALUES (${RIFMult}, '${CodP}', ${FechaAjuste}, '${Existencias}', ${Min}, '${Max}', ${Comentario}, '${TipoAjuste})`, (err, data) => {
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
    new sql.Request().query(`DELETE FROM ProductoPorMultiservicio WHERE RIFMult = ${RIFMult} AND CodP = ${CodP} AND FechaAjuste = ${FechaAjuste}`, (err, data) => {
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
    new sql.Request().query(`UPDATE ProductoPorMultiservicio SET Existencias = '${Existencias}, Min = '${Min}, Max = '${Max}, Comentario = '${Comentario}, TipoAjuste = '${TipoAjuste}' WHERE RIFMult = ${RIFMult} AND CodP = ${CodP} AND FechaAjuste = ${FechaAjuste}`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('ProductoPorMultiservicio actualizado');
        }
    })
})

module.exports = router;