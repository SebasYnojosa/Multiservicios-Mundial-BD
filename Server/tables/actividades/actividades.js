class Actividades{
    constructor(CodServicio, CodActividad, DescA, Costo, TiempoMin, CodFichaSS, CantA, CostoAF, CodMantenimiento){
        this.CodServicio = CodServicio;
        this.CodActividad = CodActividad;
        this.DescA = DescA;
        this.Costo = Costo;
        this.TiempoMin = TiempoMin;
        this.CodFichaSS = CodFichaSS;
        this.CantA = CantA;
        this.CostoAF = CostoAF;
        this.CodMantenimiento = CodMantenimiento;
    }
}

module.exports = Actividades;