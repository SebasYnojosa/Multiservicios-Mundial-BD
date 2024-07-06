class Productos{
    constructor(CodProducto, Nombre, Descripcion, Precio, Ecologico, CodFacturaT, CantidadP, PrecioT, CodReq, CantProd, CodLinea){
        this.CodProducto = CodProducto;
        this.Nombre = Nombre;
        this.Descripcion = Descripcion;
        this.Precio = Precio;
        this.Ecologico = Ecologico;
        this.CodFacturaT = CodFacturaT;
        this.CantidadP = CantidadP;
        this.PrecioT = PrecioT;
        this.CodReq = CodReq;
        this.CantProd = CantProd;
        this.CodLinea = CodLinea;
    }
}

module.exports = Productos;