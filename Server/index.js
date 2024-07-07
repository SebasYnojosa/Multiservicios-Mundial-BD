const express = require('express');

const cors = require('cors');

const app = express();

const routerMultiservicios = require('./routes/Multiservicios.routes.js');
const routerPersonal = require('./routes/Personal.routes.js');
const routerTipoVehiculos = require('./routes/TipoVehiculos.routes.js');
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
const routerProductos = require('./routes/Productos.routes.js');
const routerRequisiciones = require('./routes/Requisiciones.routes.js');
const routerLineasSuministros = require('./routes/LineasSuministros.routes.js');
const routerProveedores = require('./routes/Proveedores.routes.js');
const routerOrdenesCompras = require('./routes/OrdenesCompras.routes.js');
const routerFacturasProveedor = require('./routes/FacturasProveedor.routes.js');
const routerActividades = require('./routes/Actividades.routes.js');
const routerActividadRequiereProducto = require('./routes/ActividadRequiereProducto.routes.js');
const routerModelos = require('./routes/Modelos.routes.js');
const routerPagosServicios = require('./routes/PagosServicios.routes.js');
const routerPagosTienda = require('./routes/PagosTienda.routes.js');
const routerPersonalRealizaServicio = require('./routes/PersonalRealizaServicio.routes.js');
const routerDetalleFacturasServicios = require('./routes/DetalleFacturasServicios.routes.js');
const routerReservaApartaActividad = require('./routes/ReservaApartaActividad.routes.js');
const routerSolicitudPideActividades = require('./routes/SolicitudPideActividades.routes.js');
const routerDetalleFacturaTienda = require('./routes/DetalleFacturaTienda.routes.js');
const routerProductoUsadoActividad = require('./routes/ProductoUsadoActividad.routes.js');
const routerMantenimientoPorModelo = require('./routes/MantenimientoPorModelo.routes.js');
const routerProductoPorModelo = require('./routes/ProductoPorModelo.routes.js');
const routerActividadesPorMantenimiento = require('./routes/ActividadesPorMantenimiento.routes.js');
const routerLineaSumPorProveedor = require('./routes/LineaSumPorProveedor.routes.js');
const routerProductoPorMultiservicio = require('./routes/ProductoPorMultiservicio.routes.js');
const routerMultiserviciosEspecializadoTipoVehiculos = require('./routes/MultiserviciosEspecializadoTipoVehiculos.routes.js');

app.use(cors({
    origin: 'http://localhost:8100'
}));

app.use(express.json());

app.use('/multiservicios', routerMultiservicios);
app.use('/personal', routerPersonal);
app.use('/tipovehiculos', routerTipoVehiculos);
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
app.use('/productos', routerProductos);
app.use('/requisiciones', routerRequisiciones);
app.use('/lineassuministros', routerLineasSuministros);
app.use('/proveedores', routerProveedores);
app.use('/ordenescompras', routerOrdenesCompras);
app.use('/facturasproveedor', routerFacturasProveedor); 
app.use('/actividades', routerActividades);
app.use('/actividad/producto', routerActividadRequiereProducto);
app.use('/modelos', routerModelos);
app.use('/pagos/servicios', routerPagosServicios);
app.use('/pagos/tienda', routerPagosTienda);
app.use('/personal/servicio', routerPersonalRealizaServicio);
app.use('/facturasservicios/detalle', routerDetalleFacturasServicios);
app.use('/reserva/actividad', routerReservaApartaActividad);
app.use('/solicitud/actividades', routerSolicitudPideActividades);
app.use('/facturatienda/detalle', routerDetalleFacturaTienda);
app.use('/producto/actividad', routerProductoUsadoActividad);
app.use('/mantenimiento/modelo', routerMantenimientoPorModelo);
app.use('/producto/modelo', routerProductoPorModelo);
app.use('/actividades/mantenimiento', routerActividadesPorMantenimiento);
app.use('/lineasum/proveedor', routerLineaSumPorProveedor);
app.use('/producto/multiservicio', routerProductoPorMultiservicio);
app.use('/multiservicios/tipovehiculos', routerMultiserviciosEspecializadoTipoVehiculos);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

module.exports = app;