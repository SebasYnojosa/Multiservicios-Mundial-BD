class MantenimientoPorModelo{
    constructor(CodMarca, CodModelo, CodMantenimiento, TiempoUso, Kilometraje){
        this.CodMarca = CodMarca;
        this.CodModelo = CodModelo;
        this.CodMantenimiento = CodMantenimiento;
        this.TiempoUso = TiempoUso;
        this.Kilometraje = Kilometraje;
    }
}

module.exports = MantenimientoPorModelo;