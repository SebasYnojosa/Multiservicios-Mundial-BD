CREATE TRIGGER triggerSolicitudPideActividades_AfterDelete
ON SolicitudPideActividades AFTER DELETE
AS
BEGIN 
    UPDATE SolicitudServicios 
    SET Costo = Costo - (SELECT Costo FROM Actividad WHERE CodActividad = inserted.CodActividad)
    WHERE CodFicha IN (SELECT CodFicha FROM inserted)

    UPDATE SolicitudServicios
    SET CantActividades = CantActividades - 1
    WHERE CodFicha IN (SELECT CodFicha FROM inserted)
END;