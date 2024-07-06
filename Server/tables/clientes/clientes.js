class Clientes{
    constructor(CI, CodDescuento, Nombre, Email, TelfPrincipal, TelfSecundario){
        this.CI = CI;
        this.CodDescuento = CodDescuento;
        this.Nombre = Nombre;
        this.Email = Email;
        this.TelfPrincipal = TelfPrincipal;
        this.TelfSecundario = TelfSecundario;
    }
}

module.exports = Clientes;