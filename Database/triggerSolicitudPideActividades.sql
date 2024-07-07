CREATE TRIGGER triggerSolicitudPideActividades
ON SolicitudPideActividades AFTER DELETE, INSERT
AS
IF EXISTS (SELECT * FROM deleted)
BEGIN 
    UPDATE SolicitudServicios 
    SET Costo = Costo - (SELECT Costo FROM Actividad WHERE CodActividad = deleted.CodActividad)
    WHERE CodFicha IN (SELECT CodFicha FROM inserted)

    UPDATE SolicitudServicios
    SET CantActividades = CantActividades - 1
    WHERE CodFicha IN (SELECT CodFicha FROM deleted)
END
IF EXISTS (SELECT * FROM inserted)
BEGIN
    UPDATE SolicitudServicios
    SET Costo = Costo + (SELECT Costo FROM Actividad WHERE CodActividad = inserted.CodActividad)
    WHERE CodFicha IN (SELECT CodFicha FROM inserted)

    UPDATE SolicitudServicios
    SET CantActividades = CantActividades + 1
    WHERE CodFicha IN (SELECT CodFicha FROM inserted)
END