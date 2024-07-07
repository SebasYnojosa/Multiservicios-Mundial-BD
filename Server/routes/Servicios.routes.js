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
    let query = `SELECT * FROM Servicios WHERE CodServicio = @CodServicio`;
    new sql.Request()
        .input('CodServicio', sql.Int, CodServicio)
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
    const { CodServicio, DescC, Monto, TiempoAnt, CIPersonal, RIFMultiServ } = req.body;
    let query = `INSERT INTO Servicios (CodServicio, DescC, Monto, TiempoAnt, CIPersonal, RIFMultiServ) VALUES (@CodServicio, @DescC, @Monto, @TiempoAnt, @CIPersonal, @RIFMultiServ)`;
    new sql.Request()
        .input('CodServicio', sql.Int, CodServicio)
        .input('DescC', sql.VarChar, DescC)
        .input('Monto', sql.Decimal, Monto)
        .input('TiempoAnt', sql.Time, TiempoAnt)
        .input('CIPersonal', sql.Int, CIPersonal)
        .input('RIFMultiServ', sql.Int, RIFMultiServ)
        .query(query, (err, data) => {
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
    let query = `DELETE FROM Servicios WHERE CodServicio = @CodServicio`;
    new sql.Request()
        .input('CodServicio', sql.Int, CodServicio)
        .query(query, (err, data) => {
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
    const { DescC, Monto, TiempoAnt, CIPersonal, RIFMultiServ } = req.body;
    let query = `UPDATE Servicios SET DescC = @DescC, Monto = @Monto, TiempoAnt = @TiempoAnt, CIPersonal = @CIPersonal, RIFMultiServ = @RIFMultiServ WHERE CodServicio = @CodServicio}`;
    new sql.Request()
        .input('CodServicio', sql.Int, CodServicio)
        .input('DescC', sql.VarChar, DescC)
        .input('Monto', sql.Decimal, Monto)
        .input('TiempoAnt', sql.Time, TiempoAnt)
        .input('CIPersonal', sql.Int, CIPersonal)
        .input('RIFMultiServ', sql.Int, RIFMultiServ)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('Servicio actualizado');
            }
        })
})

module.exports = router;