var express = require('express');
var router = express.Router();
var sql = require('../../Database/sqlConnection.js');

router.get('/', (req, res) => {
    new sql.Request().query('SELECT * FROM TipoVehiculos', (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send(data.recordset);
            console.dir(data.recordset);
        }
    })
})

router.get('/:Idtipo', (req, res) => {
    const { Idtipo } = req.params;
    let query = `SELECT * FROM TipoVehiculos WHERE Idtipo = @Idtipo`;
    new sql.Request()
        .input('Idtipo', sql.Int, Idtipo)
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
    const { Idtipo, DescripcionT } = req.body;
    let query = `INSERT INTO TipoVehiculos VALUES (@Idtipo, @DescripcionT)`;
    new sql.Request()
        .input('Idtipo', sql.Int, Idtipo)
        .input('DescripcionT', sql.VarChar, DescripcionT)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('TipoVehiculos agregado');
            }
        })
})

router.delete('/:Idtipo', (req, res) => {
    const { Idtipo } = req.params;
    let query = `DELETE FROM TipoVehiculos WHERE Idtipo = @Idtipo`;
    new sql.Request()
        .input('Idtipo', sql.Int, Idtipo)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('TipoVehiculos eliminado');
            }
        })
})

router.put('/:Idtipo', (req, res) => {
    const { Idtipo } = req.params;
    const { DescripcionT } = req.body;
    let query = `UPDATE TipoVehiculos SET DescripcionT = @DescripcionT WHERE Idtipo = @Idtipo`;
    new sql.Request()
        .input('Idtipo', sql.Int, Idtipo)
        .input('DescripcionT', sql.VarChar, DescripcionT)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('TipoVehiculos actualizado');
            }
        })
})

module.exports = router;