class Mantenimientos{
    constructor(CodMantenimiento, Descripcion, CodVehiculo, FechaMant){
        this.CodMantenimiento = CodMantenimiento;
        this.Descripcion = Descripcion;
        this.CodVehiculo = CodVehiculo;
        this.FechaMant = FechaMant;
    }
}

module.exports = Mantenimientos;