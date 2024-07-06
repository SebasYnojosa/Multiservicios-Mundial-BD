const express = require('express');

const app = express();

const routerMultiservicios = require('./routes/Multiservicios.routes.js');
const routerPersonal = require('./routes/Personal.routes.js');
const routerTipoVehiculos = require('./routes/TipoVehiculos.routes.js');
const routerEncargados = require('./routes/Encargados.routes.js');
const routerServicios = require('./routes/Servicios.routes.js');
const routerFacturasServicios = require('./routes/FacturasServicios.routes.js');

app.use(express.json());
app.use('/multiservicios', routerMultiservicios);
app.use('/personal', routerPersonal);
app.use('/tipovehiculos', routerTipoVehiculos);
app.use('/encargados', routerEncargados);
app.use('/servicios', routerServicios);
app.use('/facturasservicios', routerFacturasServicios);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

module.exports = app;