import { Component } from '@angular/core';
import { CarritoService } from '../services/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {

  constructor(private serviceCarrito: CarritoService){}

  //escuchar al observable
  miCarrito$ = this.serviceCarrito.miCarrito$;

  totalProductos(precio:number, unidades:number){

    return Number((precio * unidades).toFixed(2));

  }

  deleteProductos(id:number){
    this.serviceCarrito.deleteProduct(id);
  }

  updateUnits(operation: string, id: number) {

    //buscar mi producto y traerme la info del producto que he pinchado.
    const product = this.serviceCarrito.findProductById(id);

    //si el producto existe en mi carrito
    if (product) {
      if (operation === 'minus' && product.cantidad > 0) {
        product.cantidad = product.cantidad - 1;
      }
      if (operation === 'add') {
        product.cantidad = product.cantidad + 1;

      }
      //cuando la cantidad llegue a 0 se elimina
      if (product.cantidad === 0) {
        this.deleteProductos(id)
      }
    }

  }

  totalCart(){
    const result = this.serviceCarrito.totalCart();
    return  result.toFixed(2);;
  }
  

  

}
