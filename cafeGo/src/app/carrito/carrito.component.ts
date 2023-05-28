import { Component } from '@angular/core';
import { CarritoService } from '../services/carrito.service';
import { Producto } from '../models/Producto';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {

  constructor(private serviceCarrito: CarritoService, private router: Router, private route: ActivatedRoute,) { }

  //oculatar el div cuando estemos en el componente pedido 
  mostrarCarrito:boolean = true;

  //escuchar al observable
  miCarrito$ = this.serviceCarrito.miCarrito$;

  //Productos que hay en el carrito
  productosCarrito: Producto[] = [];

  totalProductos(precio: number, unidades: number) {

    return Number((precio * unidades).toFixed(2));

  }

  deleteProductos(id: number) {
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

  totalCart() {
    const result = this.serviceCarrito.totalCart();
    return result.toFixed(2);
  }

  //Realizar pedido

  realizarPedido() {

    //oculatar el carrito

    this.mostrarCarrito = false;

  


    //Acceder a la lista de productos
    this.miCarrito$.subscribe(carrito => {
      this.productosCarrito = carrito;
    });

    console.log("se acttualiza el carrito cuando estamos en pagar?", this.productosCarrito)
    console.log("y el observable?", this.miCarrito$)

    //Pasarla por routing a pedido

    // Convertir el array productosCarrito en una cadena JSON
    const productosCarritoString = JSON.stringify(this.productosCarrito);

    // Pasarla por routing a pedido
    let navigationExtras: NavigationExtras = {
      queryParams: { productos: productosCarritoString }
    };

    console.log(navigationExtras);

    this.router.navigate(['/pedido'], navigationExtras);

 
  }

    //para que se muestre o no el carrito
    viewCart: boolean = true;

    onToggleCart() {
    this.viewCart = !this.viewCart
    };

 


}
