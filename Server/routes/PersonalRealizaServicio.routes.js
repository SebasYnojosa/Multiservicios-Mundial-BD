var express = require('express');
var router = express.Router();
var sql = require('../../Database/sqlConnection.js');

router.get('/', (req, res) => {
    new sql.Request().query('SELECT * FROM PersonalRealizaServicio', (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send(data.recordset);
            console.dir(data.recordset);
        }
    })
})

router.get('/:CIPersonal/:CodServicio', (req, res) => {
    const { CIPersonal, CodServicio } = req.params;
    let query = `SELECT * FROM PersonalRealizaServicio WHERE CIPersonal = @CIPersonal AND CodServicio = @CodServicio`;
    new sql.Request()
        .input('CIPersonal', sql.Int, CIPersonal)
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
    const { CIPersonal, CodServicio } = req.body;
    let query = `INSERT INTO PersonalRealizaServicio VALUES (@CIPersonal, @CodServicio)`;
    new sql.Request()
        .input('CIPersonal', sql.Int, CIPersonal)
        .input('CodServicio', sql.Int, CodServicio)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('PersonalRealizaServicio agregado');
            }
        })
})

router.delete('/:CIPersonal/:CodServicio', (req, res) => {
    const { CIPersonal, CodServicio } = req.params;
    let query = `DELETE FROM PersonalRealizaServicio WHERE CIPersonal = @CIPersonal AND CodServicio = @CodServicio`;
    new sql.Request()
        .input('CIPersonal', sql.Int, CIPersonal)
        .input('CodServicio', sql.Int, CodServicio)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('PersonalRealizaServicio eliminado');
            }
        })
})

module.exports = router;