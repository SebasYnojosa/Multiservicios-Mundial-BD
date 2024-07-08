var express = require('express');
var router = express.Router();
var sql = require('../../Database/sqlConnection.js');

router.get('/', (req, res) => {
    new sql.Request().query('SELECT s.CodServicio, s.DescC, s.Monto, s.TiempoAnt, p.NombreC, m.Nombre, COUNT(a.CodActividad) AS CantidadActividades FROM Servicios s, Personal p, Multiservicios m, Actividades a WHERE m.RIF = s.RIFMultiServ AND p.CI = s.CIPersonal AND a.CodServicio = s.CodServicio', (err, data) => {
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
    let query = `SELECT s.CodServicio, s.DescC, s.Monto, s.TiempoAnt, p.NombreC, m.Nombre, COUNT(a.CodActividad) AS CantidadActividades FROM Servicios s, Personal p, Multiservicios m, Actividades a WHERE m.RIF = s.RIFMultiServ AND p.CI = s.CIPersonal AND a.CodServicio = s.CodServicio AND CodServicio = @CodServicio GROUP BY s.CodServicio, s.DescC, s.Monto, s.TiempoAnt, p.NombreC, m.Nombre`;
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

// Obtener las actividades de un servicio
router.get('/actividades/:CodServicio', (req, res) => {
    const { CodServicio } = req.params;
    let query = `SELECT * FROM Actividades WHERE CodServicio = @CodServicio`;
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

module.exports = router;