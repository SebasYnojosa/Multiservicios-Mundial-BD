class Servicios{
    constructor(CodServicio, DescC, Monto, TiempoAnt, CIPersonal, RIFMultiServ, CodFacturaS, MontoDetalle){
        this.CodServicio = CodServicio;
        this.DescC = DescC;
        this.Monto = Monto;
        this.TiempoAnt = TiempoAnt;
        this.CIPersonal = CIPersonal;
        this.RIFMultiServ = RIFMultiServ;
        this.CodFacturaS = CodFacturaS;
        this.MontoDetalle = MontoDetalle;        
    }
}

module.exports = Servicios;