export class Producto{


    IDProducto: number;
    NombreProducto: string;
    Categoria: number;
    Frio: number;
    UnidadProducto:number;
    PrecioProducto:number;
    DescripcionProducto:string;
    cantidad:number;
    LinkImagen:string;


    constructor(
        IDProducto: number,
        NombreProducto: string,
        Categoria: number,
        Frio: number,
        UnidadProducto: number,
        PrecioProducto: number,
        DescripcionProducto: string,
        LinkImagen:string,
       cantidad:number
      ) {
        this.IDProducto = IDProducto;
        this.NombreProducto = NombreProducto;
        this.Categoria = Categoria;
        this.Frio = Frio;
        this.UnidadProducto = UnidadProducto;
        this.PrecioProducto = PrecioProducto;
        this.DescripcionProducto = DescripcionProducto;
        this.cantidad = cantidad;
     this.LinkImagen = LinkImagen;
      }
    

}