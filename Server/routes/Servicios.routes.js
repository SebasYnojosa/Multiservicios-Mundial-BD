var express = require('express');
var router = express.Router();
var sql = require('../../Database/sqlConnection.js');

router.get('/', (req, res) => {
    new sql.Request().query('SELECT * FROM Servicios', (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send(data.recordset);
            console.dir(data.recordset);
        }
    })
})

router.get('/:CodServicio', (req, res) => {
    const { CodServicio } = req.params;
    new sql.Request().query(`SELECT * FROM Servicios WHERE CodServicio = ${CodServicio}`, (err, data) => {
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
    const { CodServicio, DescC, Monto, TiempoAnt, CIPersonal, RIFMultiServ, CodFacturaS, MontoDetalle } = req.body;
    new sql.Request().query(`INSERT INTO Servicios VALUES (${CodServicio}, '${DescC}', '${Monto}', '${TiempoAnt}', '${CIPersonal}', '${RIFMultiServ}', '${CodFacturaS}', '${MontoDetalle}')`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('Servicio agregado');
        }
    })
})

router.delete('/:CodServicio', (req, res) => {
    const { CodServicio } = req.params;
    new sql.Request().query(`DELETE FROM Servicios WHERE CodServicio = ${CodServicio}`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('Servicio eliminado');
        }
    })
})

router.put('/:CodServicio', (req, res) => {
    const { CodServicio } = req.params;
    const { DescC, Monto, TiempoAnt, CIPersonal, RIFMultiServ, CodFacturaS, MontoDetalle } = req.body;
    new sql.Request().query(`UPDATE Servicios SET DescC = '${DescC}, Monto = '${Monto}, TiempoAnt = '${TiempoAnt}, CIPersonal = '${CIPersonal}, RIFMultiServ = '${RIFMultiServ}, CodFacturaS = '${CodFacturaS}, MontoDetalle = '${MontoDetalle} WHERE CodServicio = ${CodServicio}`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('Servicio actualizado');
        }
    })
})

module.exports = router;