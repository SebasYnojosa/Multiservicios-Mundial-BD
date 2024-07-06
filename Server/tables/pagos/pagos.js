class Pagos{
    constructor(CodFacturaS, CodFacturaT, CodPago, Tipo, Moneda, Telefono, Fecha, Referencia, Modalidad, Monto, NumTarjeta, Banco){
        this.CodFacturaS = CodFacturaS;
        this.CodFacturaT = CodFacturaT;
        this.CodPago = CodPago;
        this.Tipo = Tipo;
        this.Moneda = Moneda;
        this.Telefono = Telefono;
        this.Fecha = Fecha;
        this.Referencia = Referencia;
        this.Modalidad = Modalidad;
        this.Monto = Monto;
        this.NumTarjeta = NumTarjeta;
        this.Banco = Banco;
    }
}

module.exports = Pagos;