var express = require('express');
var router = express.Router();
var sql = require('../../Database/sqlConnection.js');

router.get('/', (req, res) => {
    new sql.Request().query('SELECT * FROM LineasSuministros', (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send(data.recordset);
            console.dir(data.recordset);
        }
    })
})

router.get('/:CodLinea', (req, res) => {
    const { CodLinea } = req.params;
    new sql.Request().query(`SELECT * FROM LineasSuministros WHERE CodLinea = ${CodLinea}`, (err, data) => {
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
    const { CodLinea, Descripcion } = req.body;
    new sql.Request().query(`INSERT INTO LineasSuministros VALUES (${CodLinea}, '${Descripcion}')`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('LineaSuministro agregado');
        }
    })
})

router.delete('/:CodLinea', (req, res) => {
    const { CodLinea } = req.params;
    new sql.Request().query(`DELETE FROM LineasSuministros WHERE CodLinea = ${CodLinea}`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('LineaSuministro eliminado');
        }
    })
})

router.put('/:CodLinea', (req, res) => {
    const { CodLinea } = req.params;
    const { Descripcion } = req.body;
    new sql.Request().query(`UPDATE LineasSuministros SET Descripcion = '${Descripcion} WHERE CodLinea = ${CodLinea}`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('LineaSuministro actualizado');
        }
    })
})

module.exports = router;