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

router.get('/:CIPersonalCodServicio', (req, res) => {
    const { CIPersonal, CodServicio } = req.params;
    new sql.Request().query(`SELECT * FROM PersonalRealizaServicio WHERE CIPersonal = ${CIPersonal} AND CodServicio = ${CodServicio}`, (err, data) => {
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
    new sql.Request().query(`INSERT INTO PersonalRealizaServicio VALUES (${CIPersonal}, '${CodServicio}')`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('PersonalRealizaServicio agregado');
        }
    })
})

router.delete('/:CIPersonalCodServicio', (req, res) => {
    const { CIPersonal, CodServicio } = req.params;
    new sql.Request().query(`DELETE FROM PersonalRealizaServicio WHERE CIPersonal = ${CIPersonal} AND CodServicio = ${CodServicio}`, (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send('PersonalRealizaServicio eliminado');
        }
    })
})

module.exports = router;