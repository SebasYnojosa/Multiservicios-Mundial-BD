class Reservas{
    constructor(NumReserva, FechaReserva, PorcentajeIni, MontoAbonado, FechaActRes){
        this.NumReserva = NumReserva;
        this.FechaReserva = FechaReserva;
        this.PorcentajeIni = PorcentajeIni;
        this.MontoAbonado = MontoAbonado;
        this.FechaActRes = FechaActRes;
    }
}

module.exports = Reservas;