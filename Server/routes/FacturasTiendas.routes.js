var express = require('express');
var router = express.Router();
var sql = require('../../Database/sqlConnection.js');

router.get('/', (req, res) => {
    new sql.Request().query('SELECT * FROM FacturasTiendas', (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send(data.recordset);
            console.dir(data.recordset);
        }
    })
})

router.get('/:CodFacturaT', (req, res) => {
    const { CodFacturaT } = req.params;
    new sql.Request().query(`SELECT * FROM FacturasTiendas WHERE CodFacturaT = ${CodFacturaT}`, (err, data) => {
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
    const { CodFacturaT, FechaE, Monto, RIFMultiServ } = req.body;
    new sql.Request().query(`INSERT INTO FacturasTiendas VALUES (${CodFacturaT}, '${FechaE}', ${Monto}, '${RIFMultiServ}')`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('FacturaTienda agregado');
        }
    })
})

router.delete('/:CodFacturaT', (req, res) => {
    const { CodFacturaT } = req.params;
    new sql.Request().query(`DELETE FROM FacturasTiendas WHERE CodFacturaT = ${CodFacturaT}`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('FacturaTienda eliminado');
        }
    })
})

router.put('/:CodFacturaT', (req, res) => {
    const { CodFacturaT } = req.params;
    const { FechaE, Monto, RIFMultiServ } = req.body;
    new sql.Request().query(`UPDATE FacturasTiendas SET FechaE = '${FechaE}, Monto = '${Monto}, RIFMultiServ = '${RIFMultiServ} WHERE CodFacturaT = ${CodFacturaT}`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('FacturaTienda actualizado');
        }
    })
})

module.exports = router;