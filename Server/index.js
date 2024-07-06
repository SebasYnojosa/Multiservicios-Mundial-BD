const express = require('express');

const app = express();

const routerMultiservicios = require('./routes/Multiservicios.routes.js');
const routerPersonal = require('./routes/Personal.routes.js');
const routerTipoVehiculos = require('./routes/TipoVehiculos.routes.js');

app.use(express.json());
app.use('/multiservicios', routerMultiservicios);
app.use('/personal', routerPersonal);
app.use('/tipovehiculos', routerTipoVehiculos);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

module.exports = app;