CREATE PROC procDetalleFacturaServicios
    @CodFactura INT,
    @CodServ INT
AS
BEGIN 
    DECLARE @MontoDetalle FLOAT

    -- Se obtiene el codigo del vehiculo de la factura
    DECLARE @CodVehiculo INT

    SELECT @CodVehiculo = CodVehiculo FROM FacturasServicios WHERE CodFacturaS = @CodFactura

    -- Se obtiene el monto del detalle
    SELECT @MontoDetalle = SUM(SolicitudServicio.Costo) FROM SolicitudServicio, SolicitudPideActividades
    WHERE SolicitudServicio.CodFicha = SolicitudPideActividades.CodFicha AND SolicitudServicio.CodS = @CodServ AND SolicitudServicio.CodVehiculo = @CodVehiculo

    -- Se inserta el detalle en la tabla DetalleFacturaServicios
    UPDATE DetalleFacturasServicios SET MontoDetalle = @MontoDetalle WHERE CodF = @CodFactura AND CodServ = @CodServ
END