class OrdenesCompras{
    constructor(CodOrdenC, CodReq, CantidadComprar, PrecioCompra, CantidadEntregada, RIFProv, CodFacturaP){
        this.CodOrdenC = CodOrdenC;
        this.CodReq = CodReq;
        this.CantidadComprar = CantidadComprar;
        this.PrecioCompra = PrecioCompra;
        this.CantidadEntregada = CantidadEntregada;
        this.RIFProv = RIFProv;
        this.CodFacturaP = CodFacturaP;
    }
}

module.exports = OrdenesCompras;