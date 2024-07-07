var express = require('express');
var router = express.Router();
var sql = require('../../Database/sqlConnection.js');

router.get('/', (req, res) => {
    new sql.Request().query('SELECT * FROM SolicitudPideActividades', (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send(data.recordset);
            console.dir(data.recordset);
        }
    })
})

router.get('/:CodFichaSS/:CodS/:CodAct', (req, res) => {
    const { CodFichaSS, CodS, CodAct } = req.params;
    let query = `SELECT * FROM SolicitudPideActividades WHERE CodFichaSS = @CodFichaSS AND CodS = @CodS AND CodAct = @CodAct`;
    new sql.Request()
        .input('CodFichaSS', sql.Int, CodFichaSS)
        .input('CodS', sql.Int, CodS)
        .input('CodAct', sql.Int, CodAct)
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
    const { CodFichaSS, CodS, CodAct } = req.body;
    let query = `INSERT INTO SolicitudPideActividades VALUES (@CodFichaSS, @CodS, @CodAct)`;
    new sql.Request()
        .input('CodFichaSS', sql.Int, CodFichaSS)
        .input('CodS', sql.Int, CodS)
        .input('CodAct', sql.Int, CodAct)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('SolicitudPideActividades agregado');
            }
        })
})

router.delete('/:CodFichaSS/:CodS/:CodAct', (req, res) => {
    const { CodFichaSS, CodS, CodAct } = req.params;
    let query = `DELETE FROM SolicitudPideActividades WHERE CodFichaSS = @CodFichaSS AND CodS = @CodS AND CodAct = @CodAct`;
    new sql.Request()
        .input('CodFichaSS', sql.Int, CodFichaSS)
        .input('CodS', sql.Int, CodS)
        .input('CodAct', sql.Int, CodAct)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('SolicitudPideActividades eliminado');
            }
        })  
})

module.exports = router;