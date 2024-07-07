const sql = require('mssql');

const config = {
    server: 'localhost',
    user: 'sa',
    password: 'superdoe360', //sqlserver 
    database: 'MultiserviciosMundial',
    port: 1433,
    options: {
        encrypt: false,
        enableArithAbort: true
    }
}

sql.connect(config, function (err) {
    if (err) {
        throw err;
    }
    console.log('Conexión establecida');
})

module.exports = sql;