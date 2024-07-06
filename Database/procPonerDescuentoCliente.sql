CREATE PROC procPonerDescuentoCliente
    @CICliente INT
AS
BEGIN
    DECLARE @CantUltimasVisitas INT
    DECLARE @CodDescuento INT

    -- Cantidad de veces en los últimos 4 meses que vino el cliente
    SELECT @CantUltimasVisitas = COUNT(*) FROM SolicitudServicios WHERE CodVehiculo IN (SELECT CodVehiculo FROM Vehiculos WHERE Vehiculos.CICliente = @CICliente) AND Fecha BETWEEN DATEADD(MONTH, -4, GETDATE()) AND GETDATE()

    -- Se busca el descuento que le corresponda con la cantidad de visitas que tuvo en 4 meses
    SELECT @CodDescuento = CodDescuento FROM Descuentos WHERE @CantUltimasVisitas BETWEEN MinVisita AND MaxVisita

    -- Se le asigna la cantidad de visitas al cliente
    UPDATE Clientes SET CantUltimasVisitas = @CantUltimasVisitas WHERE CI = @CICliente

    -- Se le asigna el descuento al cliente si es que tiene uno
    IF @CodDescuento IS NOT NULL
    BEGIN
        UPDATE Clientes SET CodDescuento = @CodDescuento WHERE CI = @CICliente
    END
END