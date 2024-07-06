const express = require('express');

const app = express();

const routerMultiservicios = require('./routes/Multiservicios.routes.js');
const routerPersonal = require('./routes/Personal.routes.js');
const routerTipoVehiculos = require('./routes/TipoVehiculos.routes.js');
const routerEncargados = require('./routes/Encargados.routes.js');
const routerServicios = require('./routes/Servicios.routes.js');
const routerFacturasServicios = require('./routes/FacturasServicios.routes.js');
const routerFacturasTiendas = require('./routes/FacturasTiendas.routes.js');
const routerDescuentos = require('./routes/Descuentos.routes.js');
const routerClientes = require('./routes/Clientes.routes.js');
const routerVehiculos = require('./routes/Vehiculos.routes.js');
const routerReservas = require('./routes/Reservas.routes.js');
const routerSolicitudServicios = require('./routes/SolicitudServicios.routes.js');
const routerMarcas = require('./routes/Marcas.routes.js');
const routerMantenimientos = require('./routes/Mantenimientos.routes.js');

app.use(express.json());
app.use('/multiservicios', routerMultiservicios);
app.use('/personal', routerPersonal);
app.use('/tipovehiculos', routerTipoVehiculos);
app.use('/encargados', routerEncargados);
app.use('/servicios', routerServicios);
app.use('/facturasservicios', routerFacturasServicios);
app.use('/facturastiendas', routerFacturasTiendas);
app.use('/descuentos', routerDescuentos);
app.use('/clientes', routerClientes);
app.use('/vehiculos', routerVehiculos);
app.use('/reservas', routerReservas);
app.use('/solicitudservicios', routerSolicitudServicios);
app.use('/marcas', routerMarcas);
app.use('/mantenimientos', routerMantenimientos);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

module.exports = app;