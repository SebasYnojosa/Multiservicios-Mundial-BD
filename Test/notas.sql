CREATE DATABASE Notas

USE Notas

CREATE TABLE Alumno(
    id_alum INT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
)

CREATE TABLE Asignatura(
    id_asig INT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
)

CREATE TABLE Nota(
    id_alum INT,
    id_asig INT,
    nota INT,
    PRIMARY KEY(id_alum, id_asig),
    FOREIGN KEY(id_alum) REFERENCES Alumno(id_alum),
    FOREIGN KEY(id_asig) REFERENCES Asignatura(id_asig)
)

CREATE TABLE Profesor(
    id_prof INT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
)

CREATE TABLE Director(
    id_dir INT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
)  

INSERT INTO Alumno (id_alum, nombre)
VALUES (1, 'Juan'),
       (2, 'Pedro'),
       (3, 'Maria'),
       (4, 'Ana')

SELECT * FROM Alumno



EXEC sp_dropserver 'DESKTOP-JJ4BDQ0\SQLEXPRESS', 'droplogins'

EXEC sp_addserver 'localhost', 'local'

SELECT srvname FROM SYSSERVERS