var express = require('express');
var router = express.Router();
var sql = require('../../Database/sqlConnection.js');

router.get('/', (req, res) => {
    new sql.Request().query('SELECT * FROM DetalleFacturasServicios', (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send(data.recordset);
            console.dir(data.recordset);
        }
    })
})

router.get('/:CodF/:CodServ', (req, res) => {
    const { CodF, CodServ } = req.params;
    let query = `SELECT * FROM DetalleFacturasServicios WHERE CodF = @CodF AND CodServ = @CodServ`;
    new sql.Request()
        .input('CodF', sql.Int, CodF)
        .input('CodServ', sql.Int, CodServ)
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
    const { CodF, CodServ } = req.body;
    let query = `INSERT INTO DetalleFacturasServicios (CodF, CodServ) VALUES (@CodF, @CodServ)`;
    new sql.Request()
        .input('CodF', sql.Int, CodF)
        .input('CodServ', sql.Int, CodServ)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('DetalleFacturasServicios agregado');
            }
        })
})

router.delete('/:CodF/:CodServ', (req, res) => {
    const { CodF, CodServ } = req.params;
    let query = `DELETE FROM DetalleFacturasServicios WHERE CodF = @CodF AND CodServ = @CodServ`;
    new sql.Request()
        .input('CodF', sql.Int, CodF)
        .input('CodServ', sql.Int, CodServ)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('DetalleFacturasServicios eliminado');
            }
        })
})

module.exports = router;