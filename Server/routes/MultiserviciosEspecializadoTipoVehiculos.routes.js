var express = require('express');
var router = express.Router();
var sql = require('../../Database/sqlConnection.js');

router.get('/', (req, res) => {
    new sql.Request().query('SELECT * FROM MultiserviciosEspecializadoTipoVehiculos', (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send(data.recordset);
            console.dir(data.recordset);
        }
    })
})

router.get('/:Idtipo/:RIF', (req, res) => {
    const { Idtipo, RIF } = req.params;
    let query = `SELECT * FROM MultiserviciosEspecializadoTipoVehiculo WHERE Idtipo = @Idtipo AND RIF = @RIF`;
    new sql.Request()
        .input('Idtipo', sql.Int, Idtipo)
        .input('RIF', sql.Int, RIF)
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
    const { Idtipo, RIF } = req.body;
    let query = `INSERT INTO MultiserviciosEspecializadoTipoVehiculos VALUES (@Idtipo, @RIF)`;
    new sql.Request()
        .input('Idtipo', sql.Int, Idtipo)
        .input('RIF', sql.Int, RIF)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('MultiserviciosEspecializadoTipoVehiculo agregado');
            }
        })
})

router.delete('/:Idtipo/:RIF', (req, res) => {
    const { Idtipo, RIF } = req.params;
    let query = `DELETE FROM MultiserviciosEspecializadoTipoVehiculos WHERE Idtipo = @Idtipo AND RIF = @RIF`;
    new sql.Request()
        .input('Idtipo', sql.Int, Idtipo)
        .input('RIF', sql.Int, RIF)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('MultiserviciosEspecializadoTipoVehiculo eliminado');
            }
        })
})

module.exports = router;