CREATE TRIGGER triggerSolicitudPideActividades 
ON SolicitudPideActividades AFTER INSERT, DELETE
AS
BEGIN 
    UPDATE SolicitudServicio 
    SET Costo = (SELECT SUM(Costo) FROM SolicitudPideActividades WHERE CodFicha = SolicitudServicio.CodFicha)
    WHERE CodFicha IN (SELECT CodFicha FROM inserted)

    UPDATE SolicitudServicio
    SET CantActividades = (SELECT COUNT(*) FROM SolicitudPideActividades WHERE CodFicha = SolicitudServicio.CodFicha)
    WHERE CodFicha IN (SELECT CodFicha FROM inserted)
END;
