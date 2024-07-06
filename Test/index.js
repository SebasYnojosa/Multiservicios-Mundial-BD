const sql = require('mssql');

const config = {
    server: 'localhost',
    user: 'sa',
    password: 'sqlserver',
    database: 'Notas',
    port: 1433,
    options: {
        encrypt: false,
        enableArithAbort: true
    }
}

sql.connect(config, function (err) {
    if (err) console.log(err);
    else{
        console.log('Conexión establecida');

        const request = new sql.Request();

        request.query('SELECT * FROM Alumno;', (err, res) => {
            if (err) console.log(err)
            let data = res.recordset;
            let json_content = JSON.stringify(data, null, 2);
            console.log(json_content);
        })
    }
});