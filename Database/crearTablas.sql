CREATE DATABASE MultiserviciosMundial
USE MultiserviciosMundial

-- Creacion de Tabla Multiservicios
CREATE TABLE Multiservicios(
    RIF INT,
    Nombre VARCHAR(25) NOT NULL,
    Ciudad VARCHAR(30) NOT NULL, -- Eliminar el atributo especializacion del diagrama
    CIEncargado INT NOT NULL UNIQUE,
    PRIMARY KEY (RIF)
)

-- Tabla de tipos de vehiculos
CREATE TABLE TipoVehiculos(
    Idtipo INT,
    DescripcionT VARCHAR(30) NOT NULL DEFAULT 'Vehiculo de pasajeros', -- Tipo Vehiculo = Especializacion Multiservicio
    PRIMARY KEY (Idtipo)
)

-- Creacion de la Tabla Personal
CREATE TABLE Personal(
    CI INT,
    NombreC VARCHAR(100) NOT NULL,
    Direccion VARCHAR(50) NOT NULL,
    Telefono VARCHAR(12) NOT NULL,
    Salario DECIMAL(10, 2) NOT NULL CHECK (Salario > 0),
    RIFMultiServ INT NOT NULL,
    PRIMARY KEY (CI),
    FOREIGN KEY (RIFMultiServ) REFERENCES Multiservicios(RIF)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)


-- Creacion de la Tabla Encargados
CREATE TABLE Encargados(
    CIEncargado INT,
    FInicioEncargado DATE NOT NULL,
    PRIMARY KEY (CIEncargado),
    FOREIGN KEY (CIEncargado) REFERENCES Multiservicios(CIEncargado)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)


-- Creacion de la Tabla Servicios
CREATE TABLE Servicios(
    CodServicio INT,
    DescC VARCHAR(200) NOT NULL,
    Monto DECIMAL(10, 2) NOT NULL CHECK (Monto > 0),
    TiempoAnt TIME NOT NULL,
    CIPersonal INT NOT NULL,
    RIFMultiServ INT NOT NULL,
    CodFacturaS INT NOT NULL,
    MontoDetalle DECIMAL(10, 2) NOT NULL
    PRIMARY KEY (CodServicio),
    FOREIGN KEY (CIPersonal) REFERENCES Personal(CI)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
    FOREIGN KEY (RIFMultiServ) REFERENCES Multiservicios(RIF)
)

-- Creacion de la Tabla FacturasServicios
CREATE TABLE FacturasServicios(
    CodFacturaS INT,
    FechaE DATE NOT NULL,
    Monto DECIMAL(10, 2) NOT NULL CHECK (Monto > 0),
    CodVehiculo INT NOT NULL
    PRIMARY KEY (CodFacturaS)
)

-- FK de Tabla Servicios
ALTER TABLE Servicios
ADD FOREIGN KEY (CodFacturaS) REFERENCES FacturasServicios(CodFacturaS)
ON DELETE NO ACTION
ON UPDATE CASCADE

-- Creacion de la Tabla FacturasTienda
CREATE TABLE FacturasTiendas(
    CodFacturaT INT,
    FechaE DATE NOT NULL,
    Monto DECIMAL(10, 2) NOT NULL CHECK (Monto > 0),
    RIFMultiServ INT NOT NULL,
    PRIMARY KEY (CodFacturaT),
    FOREIGN KEY (RIFMultiServ) REFERENCES Multiservicios(RIF)
    ON DELETE NO ACTION
    ON UPDATE CASCADE
)

-- Creacion de la Tabla Descuentos
CREATE TABLE Descuentos(
    CodDescuento INT,
    Valor DECIMAL(5, 2) NOT NULL CHECK (Valor BETWEEN 0 AND 1),
    MinVisita INT NOT NULL,
    MaxVisita INT NOT NULL,
    CONSTRAINT CHK_DescVisitas CHECK (MaxVisita >= MinVisita),
    PRIMARY KEY (CodDescuento)
)

ALTER TABLE Descuentos
ADD CONSTRAINT UC_Descuentos UNIQUE (Valor)

-- Creacion de la Tabla Clientes
CREATE TABLE Clientes(
    CI INT,
	CodDescuento INT,
    Nombre VARCHAR(100) NOT NULL,
    Email VARCHAR(30) NOT NULL,
    TelfPrincipal VARCHAR(12) NOT NULL,
    TelfSecundario VARCHAR(12) NOT NULL,
    CantUltimasVisitas INT NOT NULL DEFAULT 0 CHECK (CantUltimasVisitas >= 0),
    PRIMARY KEY (CI),
	FOREIGN KEY (CodDescuento) REFERENCES Descuentos(CodDescuento)
	ON DELETE NO ACTION
	ON UPDATE CASCADE
)

-- Creacion de la Tabla Vehiculos
CREATE TABLE Vehiculos(
    CodVehiculo INT,
    Placa VARCHAR(25) NOT NULL,
    Tipo VARCHAR(20) NOT NULL,
    CICliente INT NOT NULL,
    FechaAdq DATE NOT NULL,
    CodMarca INT NOT NULL,
    CodModelo INT NOT NULL,
    Idtipo INT NOT NULL,
    PRIMARY KEY (CodVehiculo),
    FOREIGN KEY (CICliente) REFERENCES Clientes(CI)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (Idtipo) REFERENCES TipoVehiculos(Idtipo)
    ON DELETE NO ACTION
    ON UPDATE CASCADE
)

-- FK de Tabla FacturasServicios
ALTER TABLE FacturasServicios
ADD FOREIGN KEY (CodVehiculo) REFERENCES Vehiculos(CodVehiculo)
ON DELETE NO ACTION
ON UPDATE CASCADE

-- Creacion de la Tabla Reservas
CREATE TABLE Reservas(
    NumReserva INT,
    FechaReserva DATE NOT NULL,
    PorcentajeIni DECIMAL(5, 2) NOT NULL CHECK (PorcentajeIni >= 0.20 AND PorcentajeIni <= 0.50),
    MontoAbonado DECIMAL(10, 2) NOT NULL CHECK (MontoAbonado > 0), -- Debe ser entre un 20% y 50% del monto total
    FechaActRes DATE NOT NULL,                                     -- Luego el monto abonado se resta al total y eso es
    PRIMARY KEY (NumReserva)                                       -- Lo que se paga al final
)

-- Creacion de la Tabla SolicitudServicios
CREATE TABLE SolicitudServicios(
    CodFicha INT,
    NombreResponsable VARCHAR(100) NOT NULL,
    CIPersRet INT,
    NombrePersRet VARCHAR(100),
    CodVehiculo INT NOT NULL,
    Costo DECIMAL(10, 2) NOT NULL CHECK (Costo > 0),
    CantActividades INT NOT NULL CHECK (CantActividades > 0),
    PRIMARY KEY (CodFicha),
    FOREIGN KEY (CodVehiculo) REFERENCES Vehiculos(CodVehiculo)
    ON DELETE NO ACTION
    ON UPDATE CASCADE
)

-- Creacion de la Tabla Marcas
CREATE TABLE Marcas(
    CodMarca INT,
    Nombre VARCHAR(40) NOT NULL,
    PRIMARY KEY (CodMarca)
)

-- Creacion de la Tabla Mantenimientos
CREATE TABLE Mantenimientos(
    CodMantenimiento INT,
    Descripcion VARCHAR(50) NOT NULL,
    CodVehiculo INT NOT NULL,
    FechaMant DATE NOT NULL,
    PRIMARY KEY (CodMantenimiento),
    FOREIGN KEY (CodVehiculo) REFERENCES Vehiculos(CodVehiculo)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)

-- Creacion de la Tabla Productos
CREATE TABLE Productos(
    CodProducto INT,
    Nombre VARCHAR(20) NOT NULL,
    Descripcion VARCHAR(50) NOT NULL,
    Precio DECIMAL(10, 2) NOT NULL CHECK (Precio > 0),
    Ecologico CHAR(1) NOT NULL CHECK (Ecologico IN ('S', 'N')),
    CodFacturaT INT NOT NULL,
    CantidadP INT NOT NULL,
    PrecioT INT NULL,
    CodReq INT NOT NULL,
    CantProd INT NOT NULL,
    CodLinea INT NOT NULL,
    PRIMARY KEY (CodProducto),
    FOREIGN KEY (CodFacturaT) REFERENCES FacturasTiendas(CodFacturaT)
    ON DELETE NO ACTION
    ON UPDATE CASCADE
)

-- Creacion de la Tabla Requisiciones 
CREATE TABLE Requisiciones(
    CodReq INT,
    FechaGenerada DATE NOT NULL,
    PRIMARY KEY (CodReq)
)

-- FK de la Tabla Productos
ALTER TABLE Productos
ADD FOREIGN KEY (CodReq) REFERENCES Requisiciones(CodReq)

-- Creacion de la Tabla LineasSuministros
CREATE TABLE LineasSuministros(
    CodLinea INT,
    Descripcion VARCHAR(50) NOT NULL,
    PRIMARY KEY (CodLinea)
)

-- FK de la Tabla Productos
ALTER TABLE Productos
ADD FOREIGN KEY (CodLinea) REFERENCES LineasSuministros(CodLinea)
ON DELETE NO ACTION
ON UPDATE CASCADE

-- Creacion de la Tabla Proveedores
CREATE TABLE Proveedores(
    RIFProveedor INT,
    RazonSocial VARCHAR(100) NOT NULL,
    TelefonoLocal VARCHAR(12) NOT NULL,
    Contacto VARCHAR(20) NOT NULL,
    Celular VARCHAR(12) NOT NULL,
    Direccion VARCHAR(50) NOT NULL,
    CodLinea INT NOT NULL,
    PRIMARY KEY (RIFProveedor),
    FOREIGN KEY (CodLinea) REFERENCES LineasSuministros(CodLinea)
    ON DELETE NO ACTION
    ON UPDATE CASCADE
)

-- Creacion de la Tabla OrdenesCompras
CREATE TABLE OrdenesCompras(
    CodOrdenC INT,
    CodReq INT NOT NULL,
    CantidadComprar INT NOT NULL CHECK (CantidadComprar > 0),
    PrecioCompra DECIMAL(10, 2) NOT NULL CHECK (PrecioCompra > 0),
    CantidadEntregada INT NOT NULL CHECK (CantidadEntregada > 0),
    RIFProv INT NOT NULL,
    CodFacturaP INT NOT NULL,
    PRIMARY KEY (CodOrdenC),
    FOREIGN KEY (CodReq) REFERENCES Requisiciones(CodReq)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
    FOREIGN KEY (RIFProv) REFERENCES Proveedores(RIFProveedor)
    ON DELETE NO ACTION
    ON UPDATE CASCADE 
)

-- Creacion de la Tabla FacturasProveedor
CREATE TABLE FacturasProveedor(
    CodFactura INT,
    FechaE DATE NOT NULL,
    Monto DECIMAL(10, 2) NOT NULL CHECK (Monto > 0),
    RIFMultiServ INT NOT NULL,
    PRIMARY KEY (CodFactura),
    FOREIGN KEY (RIFMultiServ) REFERENCES Multiservicios(RIF)
    ON DELETE NO ACTION
    ON UPDATE CASCADE
)

-- FK de la Tabla OrdenesCompras
ALTER TABLE OrdenesCompras
ADD FOREIGN KEY (CodFacturaP) REFERENCES FacturasProveedor(CodFactura)
ON DELETE NO ACTION
ON UPDATE CASCADE

-- Creacion de la Tabla Actividades
CREATE TABLE Actividades(
    CodServicio INT,
    CodActividad INT,
    DescA VARCHAR(50) NOT NULL,
    Costo DECIMAL(10, 2) NOT NULL CHECK (Costo > 0),
    TiempoMin DATE NOT NULL,
    CodFichaSS INT,
    CodMantenimiento INT NOT NULL,
    PRIMARY KEY (CodServicio, CodActividad),
    FOREIGN KEY (CodServicio) REFERENCES Servicios(CodServicio)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (CodMantenimiento) REFERENCES Mantenimientos(CodMantenimiento)
)

-- Creacion de la tabla de SolicitudPideActividades

CREATE TABLE SolicitudPideActividades(
    CodFichaSS INT,
    CodS INT,
    CodAct INT,
    PRIMARY KEY (CodFichaSS, CodS, CodAct),
    FOREIGN KEY (CodFichaSS) REFERENCES SolicitudServicios(CodFicha),
    FOREIGN KEY (CodS, CodAct) REFERENCES Actividades(CodServicio, CodActividad)
)

CREATE TABLE ActividadRequiereProducto (
    CodS INT,
    CodAct INT,
    CodP INT,
    Cantidad INT NOT NULL CHECK (Cantidad > 0),
    PRIMARY KEY (CodS, CodAct, CodP),
    FOREIGN KEY (CodS, CodAct) REFERENCES Actividades(CodServicio, CodActividad)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (CodP) REFERENCES Productos(CodProducto)
)

-- Creacion de la Tabla Modelos
CREATE TABLE Modelos(
    CodMarca INT,
    CodModelo INT,
    Descripcion VARCHAR(40) NOT NULL,
    Refrigerante VARCHAR(30) NOT NULL,
    AceiteMotor VARCHAR(30) NOT NULL,
    Octanaje VARCHAR(20) NOT NULL,
    Peso DECIMAL(6, 2) NOT NULL CHECK (Peso > 0),
    CantPuesto INT NOT NULL CHECK (CantPuesto > 0),
    AceiteCaja VARCHAR(30) NOT NULL,
    PRIMARY KEY (CodMarca, CodModelo),
    FOREIGN KEY (CodMarca) REFERENCES Marcas(CodMarca)
    ON DELETE NO ACTION
    ON UPDATE CASCADE
)

-- FK de la Tabla Vehiculos
ALTER TABLE Vehiculos
ADD FOREIGN KEY (CodMarca, CodModelo) REFERENCES Modelos(CodMarca, CodModelo)
ON DELETE NO ACTION
ON UPDATE CASCADE

-- Creacion de la Tabla Pagos
CREATE TABLE Pagos(
    CodFacturaS INT,
    CodFacturaT INT,
    CodPago INT,
    Tipo CHAR(2) NOT NULL,
    Moneda CHAR(1) NOT NULL,
    Telefono VARCHAR(12) NOT NULL,
    Fecha DATE NOT NULL,
    Referencia VARCHAR(50) NOT NULL,
    Modalidad VARCHAR(20) NOT NULL,
    Monto DECIMAL(10, 2) NOT NULL CHECK (Monto > 0),
    NumTarjeta VARCHAR(16) NOT NULL,
    Banco VARCHAR(20) NOT NULL,
    PRIMARY KEY (CodFacturaS, CodFacturaT, CodPago),
    FOREIGN KEY (CodFacturaS) REFERENCES FacturasServicios(CodFacturaS)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
    FOREIGN KEY (CodFacturaT) REFERENCES FacturasTiendas(CodFacturaT)
    ON DELETE NO ACTION
    ON UPDATE CASCADE
)

CREATE TABLE PersonalRealizaServicio(
    CIPersonal INT,
    CodServicio INT,
    PRIMARY KEY (CIPersonal, CodServicio),
    FOREIGN KEY (CIPersonal) REFERENCES Personal(CI)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (CodServicio) REFERENCES Servicios(CodServicio)
)

CREATE TABLE DetalleFacturasServicios(
    CodF INT,
    CodServ INT,
    MontoDetalle DECIMAL(10, 2) NOT NULL CHECK (MontoDetalle > 0),
    PRIMARY KEY (CodF, CodServ),
    FOREIGN KEY (CodF) REFERENCES FacturasServicios(CodFacturaS)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (CodServ) REFERENCES Servicios(CodServicio)
)

-- (22) DetalleFacturasServicios ([CodF] -> (4), [CodServ] -> (3), MontoDetalle)

CREATE TABLE ReservaApartaActividad (
    NumReserva INT,
    CodS INT,
    CodAct INT,
    Disponibilidad CHAR(1) NOT NULL,
    FAnterior DATE NOT NULL,
    PRIMARY KEY (NumReserva, CodS, CodAct),
    FOREIGN KEY (NumReserva) REFERENCES Reservas(NumReserva)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (CodS, CodAct) REFERENCES Actividades(CodServicio, CodActividad)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)

-- (23) ReservaApartaActividad ([NumReserva] -> (8), [CodS, CodAct] -> (18),
-- Disponibilidad, FAnterior)

CREATE TABLE DetalleFacturaTienda (
    CodF INT,
    CodP INT,
    Cantidad INT NOT NULL CHECK (Cantidad > 0),
    PrecioT DECIMAL(10, 2) NOT NULL CHECK (PrecioT > 0),
    PRIMARY KEY (CodF, CodP),
    FOREIGN KEY (CodF) REFERENCES FacturasTiendas(CodFacturaT)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (CodP) REFERENCES Productos(CodProducto)
)

-- (25) DetalleFacturaTienda ([CodF] -> (5), [CodP] -> (12), Cantidad, PrecioT)

CREATE TABLE ProductoUsadoActividad (
    CodS INT,
    CodAct INT,
    CodP INT,
    Cantidad INT NOT NULL CHECK (Cantidad > 0),
    Costo DECIMAL(10, 2) NOT NULL CHECK (Costo > 0),
    PRIMARY KEY (CodS, CodAct, CodP),
    FOREIGN KEY (CodS, CodAct) REFERENCES Actividades(CodServicio, CodActividad)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (CodP) REFERENCES Productos(CodProducto)
)    

-- (27) ProductoUsadoActividad ([CodS, CodAct] -> (18), [CodP] -> (12), Cantidad,
-- Costo)

CREATE TABLE MantenimientoPorModelo (
    CodMarca INT,
    CodModelo INT,
    CodMantenimiento INT,
    TiempoUso TIME NOT NULL,
    Kilometraje INT NOT NULL CHECK (Kilometraje > 0),
    PRIMARY KEY (CodMarca, CodModelo, CodMantenimiento, TiempoUso, Kilometraje),
    FOREIGN KEY (CodMarca, CodModelo) REFERENCES Modelos(CodMarca, CodModelo)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
    FOREIGN KEY (CodMarca, CodModelo) REFERENCES Modelos(CodMarca, CodModelo)
)

-- (28) MantenimientoPorModelo ([CodMarca, CodModelo] -> (19),
-- [CodMantenimiento] -> (11), TiempoUso, Kilometraje)

CREATE TABLE ProductoPorModelo (
    CodMarca INT,
    CodModelo INT,
    CodP INT,
    Cantidad INT NOT NULL CHECK (Cantidad > 0),
    PRIMARY KEY (CodMarca, CodModelo, CodP),
    FOREIGN KEY (CodMarca, CodModelo) REFERENCES Modelos(CodMarca, CodModelo)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
    FOREIGN KEY (CodP) REFERENCES Productos(CodProducto)
    ON DELETE NO ACTION
    ON UPDATE CASCADE
)

CREATE TABLE ActividadesPorMantenimiento (
    CodS INT,
    CodAct INT,
    CodMant INT,
    PRIMARY KEY (CodS, CodAct, CodMant),
    FOREIGN KEY (CodS, CodAct) REFERENCES Actividades(CodServicio, CodActividad)
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
    FOREIGN KEY (CodMant) REFERENCES Mantenimientos(CodMantenimiento)
)

-- ActividadesPorMantenimiento ([CodS, CodAct,] -> (18), [CodMant] -> (11))

CREATE TABLE LineaSumPorProveedor (
    RIFProveedor INT,
    CodLinea INT,
    PRIMARY KEY (RIFProveedor, CodLinea),
    FOREIGN KEY (RIFProveedor) REFERENCES Proveedores(RIFProveedor)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (CodLinea) REFERENCES LineasSuministros(CodLinea)
)

-- (31) LineaSumPorProveedor ([RIFProveedor] -> (15), [CodLinea] -> (14))

CREATE TABLE ProductoPorMultiservicio (
    RIFMult INT,
    CodP INT,
    FechaAjuste DATE,
    Existencias INT NOT NULL CHECK (Existencias >= 0),
    Min INT NOT NULL CHECK (Min > 0),
    Max INT NOT NULL,
    Comentario VARCHAR(50) NOT NULL,
    TipoAjuste CHAR(1) NOT NULL,
    PRIMARY KEY (RIFMult, CodP, FechaAjuste),
    FOREIGN KEY (RIFMult) REFERENCES Multiservicios(RIF)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (CodP) REFERENCES Productos(CodProducto),
	CONSTRAINT CHK_Max CHECK (Max > 0 AND Max >= Min)
)

CREATE TABLE MultiserviciosEspecializadoTipoVehiculos (
    Idtipo INT,
    RIF INT,
    PRIMARY KEY (Idtipo, RIF),
    FOREIGN KEY (Idtipo) REFERENCES TipoVehiculos(Idtipo)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (RIF) REFERENCES Multiservicios(RIF)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)