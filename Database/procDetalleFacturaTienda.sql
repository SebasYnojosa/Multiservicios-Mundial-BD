CREATE PROC procDetalleFacturaTienda
    @CodFactura INT,
    @CodProd INT
AS
BEGIN 
    DECLARE @MontoDetalle FLOAT

    -- Se obtiene la cantidad de productos de la factura
    DECLARE @Cantidad INT

    SELECT @Cantidad = Cantidad FROM DetalleFacturaTienda WHERE CodF = @CodFactura AND CodP = @CodProd

    -- Se obtiene el precio del producto
    DECLARE @Precio FLOAT

    SELECT @Precio = Precio FROM Productos WHERE CodProducto = @CodProd

    -- Se obtiene el monto del detalle
    SELECT @MontoDetalle = @Cantidad * @Precio

    -- Se inserta el detalle en la tabla DetalleFacturaTienda
    UPDATE DetalleFacturaTienda SET MontoDetalle = @MontoDetalle WHERE CodFactura = @CodFactura AND CodProd = @CodProd

    -- Se actualiza el monto total de la factura
    UPDATE FacturasTiendas SET Monto = Monto + @MontoDetalle WHERE CodFacturaT = @CodFactura
END