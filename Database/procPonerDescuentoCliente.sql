CREATE PROC procPonerDescuentoCliente
    @CodCliente INT
AS
BEGIN
    DECLARE @CantUltimasVisitas INT
    DECLARE @CodDescuento INT

    -- Cantidad de veces en los últimos 4 meses que vino el cliente
    SELECT @CantUltimasVisitas = COUNT(*) FROM SolicitudServicios WHERE CodCliente = @CodCliente AND FechaHora BETWEEN DATEADD(MONTH, -4, GETDATE()) AND GETDATE()

    -- Se busca el descuento que le corresponda con la cantidad de visitas que tuvo en 4 meses
    SELECT @CodDescuento = CodDescuento FROM Descuento WHERE @CantUltimasVisitas BETWEEN MinVisita AND MaxVisita

    -- Se le asigna la cantidad de visitas al cliente
    UPDATE Cliente SET CantUltimasVisitas = @CantUltimasVisitas WHERE CodCliente = @CodCliente

    -- Se le asigna el descuento al cliente si es que tiene uno
    IF @CodDescuento IS NOT NULL
    BEGIN
        UPDATE Cliente SET CodDescuento = @CodDescuento WHERE CodCliente = @CodCliente
    END
END