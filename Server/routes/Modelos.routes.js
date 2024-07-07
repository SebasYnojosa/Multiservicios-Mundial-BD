var express = require('express');
var router = express.Router();
var sql = require('../../Database/sqlConnection.js');

router.get('/', (req, res) => {
    new sql.Request().query('SELECT * FROM Modelos', (err, data) => {
        if (err) {
            console.log('Error executing query: ' + err);
        }
        else {
            res.send(data.recordset);
            console.dir(data.recordset);
        }
    })
})

router.get('/:CodMarca/:CodModelo', (req, res) => {
    const { CodMarca, CodModelo } = req.params;
    let query = `SELECT * FROM Modelos WHERE CodMarca = @CodMarca AND CodModelo = @CodModelo`;
    new sql.Request()
        .input('CodMarca', sql.Int, CodMarca)
        .input('CodModelo', sql.Int, CodModelo)
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
    const { CodMarca, CodModelo, Descripcion, Refrigerante, AceiteMotor, Octanaje, Peso, CantPuesto, AceiteCaja } = req.body;
    let query = `INSERT INTO Modelos VALUES (@CodMarca, @CodModelo, @Descripcion, @Refrigerante, @AceiteMotor, @Octanaje, @Peso, @CantPuesto, @AceiteCaja)`;
    new sql.Request()
        .input('CodMarca', sql.Int, CodMarca)
        .input('CodModelo', sql.Int, CodModelo)
        .input('Descripcion', sql.VarChar, Descripcion)
        .input('Refrigerante', sql.VarChar, Refrigerante)
        .input('AceiteMotor', sql.VarChar, AceiteMotor)
        .input('Octanaje', sql.VarChar, Octanaje)
        .input('Peso', sql.Decimal, Peso)
        .input('CantPuesto', sql.Int, CantPuesto)
        .input('AceiteCaja', sql.VarChar, AceiteCaja)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('Modelo agregado');
            }
        })
    
})

router.delete('/:CodMarca/:CodModelo', (req, res) => {
    const { CodMarca, CodModelo } = req.params;
    let query = `DELETE FROM Modelos WHERE CodMarca = @CodMarca AND CodModelo = @CodModelo`;
    new sql.Request()
        .input('CodMarca', sql.Int, CodMarca)
        .input('CodModelo', sql.Int, CodModelo)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('Modelo eliminado');
            }
        })
})

router.put('/:CodMarca/:CodModelo', (req, res) => {
    const { CodMarca, CodModelo } = req.params;
    const { Descripcion, Refrigerante, AceiteMotor, Octanaje, Peso, CantPuesto, AceiteCaja } = req.body;
    let query = `UPDATE Modelos SET Descripcion = @Descripcion, Refrigerante = @Refrigerante, AceiteMotor = @AceiteMotor, Octanaje = @Octanaje, Peso = @Peso, CantPuesto = @CantPuesto, AceiteCaja = @AceiteCaja WHERE CodMarca = @CodMarca AND CodModelo = @CodModelo`;
    new sql.Request()
        .input('CodMarca', sql.Int, CodMarca)
        .input('CodModelo', sql.Int, CodModelo)
        .input('Descripcion', sql.VarChar, Descripcion)
        .input('Refrigerante', sql.VarChar, Refrigerante)
        .input('AceiteMotor', sql.VarChar, AceiteMotor)
        .input('Octanaje', sql.VarChar, Octanaje)
        .input('Peso', sql.Decimal, Peso)
        .input('CantPuesto', sql.Int, CantPuesto)
        .input('AceiteCaja', sql.VarChar, AceiteCaja)
        .query(query, (err, data) => {
            if (err) {
                console.log('Error executing query: ' + err);
            }
            else {
                res.send('Modelo actualizado');
            }
        })
})

module.exports = router;