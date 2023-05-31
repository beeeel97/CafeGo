import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../models/Producto';
import { CarritoService } from '../services/carrito.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent {

  //queryParams

  productosCarrito: Producto[]=[]

  
  constructor(private route: ActivatedRoute, private serviceCarrito: CarritoService ) { }

  ngOnInit() {

    this.recuperarCarritoCompra();

 
console.log(this.productosCarrito)

  

}

recuperarCarritoCompra (){
  this.route.queryParams.subscribe(params => {
    const productosString = params['productos'];
    if (productosString) {
      //lo pasamos de cadena Json a array
      try {
        const productosArray = JSON.parse(productosString);
        // Transformar los objetos normales en instancias de Producto
        this.productosCarrito = productosArray.map((obj:any)=> new Producto(
          obj.IDProducto,
          obj.NombreProducto,
          obj.Categoria,
          obj.Frio,
          obj.UnidadProducto,
          obj.PrecioProducto,
          obj.DescripcionProducto,
          obj.LinkImagen,
          obj.cantidad
        ));

        console.log("productos para hacer el pedido", this.productosCarrito)
      } catch (error) {
        console.error("Error al parsear los productos del carrito:", error);
      }
    }
  });

}


// obtenerCantidad(id:number){
//   return this.serviceCarrito.obtenerCantidad(id)
// }

totalProducto(precio:number, cantidad:number){
  return (precio*cantidad).toFixed(2);
  // const result = this.serviceCarrito.totalPorProducto(id);
  // return result.toFixed(2);
}

totalCarrito() {
  const result = this.serviceCarrito.totalCart();
  return result.toFixed(2);
}

pagar(){

  //insertar el pedido en la base de datos

  //pasarela de pago

}

}
