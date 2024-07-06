const express = require('express');

const app = express();

const routerMultiservicios = require('./routes/Multiservicios.routes.js');

app.use('/multiservicios', routerMultiservicios);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

module.exports = app;