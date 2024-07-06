class Proveedores{
    constructor(RIFProveedor, RazonSocial, TelefonoLocal, Contacto, Celular, Direccion, CodLinea){
        this.RIFProveedor = RIFProveedor;
        this.RazonSocial = RazonSocial;
        this.TelefonoLocal = TelefonoLocal;
        this.Contacto = Contacto;
        this.Celular = Celular;
        this.Direccion = Direccion;
        this.CodLinea = CodLinea;
    }
}

module.exports = Proveedores;