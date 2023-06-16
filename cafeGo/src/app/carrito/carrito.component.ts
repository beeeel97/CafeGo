import { Component } from '@angular/core';
import { CarritoService } from '../services/carrito.service';
import { Producto } from '../models/Producto';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {

  constructor(private serviceCarrito: CarritoService, private router: Router, private route: ActivatedRoute, private localStorageService: LocalStorageService) { 

  
  }

  ngOnInit() {
     this.loadCart();
    }


  //oculatar el div cuando estemos en el componente pedido 
  mostrarCarrito:boolean = true;

  //escuchar al observable
  miCarrito$ = this.serviceCarrito.miCarrito$;

  //Productos que hay en el carrito
  productosCarrito: Producto[] = [];

  totalProductos(precio: number, unidades: number) {

    return Number((precio * unidades).toFixed(2));

  }

  deleteProductos(id: number, product: Producto) {
    this.serviceCarrito.deleteProduct(id);
    this.localStorageService.actualizarLocalStorage(product, "borrarTodos");
  }

  updateUnits(operation: string, product: Producto) {

    //buscar mi producto y traerme la info del producto que he pinchado.
    const productID = this.serviceCarrito.findProductById(product.IDProducto);

    //si el producto existe en mi carrito
    if (productID) {
      if (operation === 'minus' && product.cantidad > 0) {
        product.cantidad = product.cantidad - 1;
        this.localStorageService.actualizarLocalStorage(product, "borrar");
      }
      if (operation === 'add') {
        product.cantidad = product.cantidad + 1;
        this.localStorageService.actualizarLocalStorage(product, "añadir");

      }
      //cuando la cantidad llegue a 0 se elimina
      if (product.cantidad === 0) {
        this.deleteProductos(product.IDProducto, product);
        this.localStorageService.actualizarLocalStorage(product, "borrar");
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
    // this.miCarrito$.subscribe(carrito => {
    //   this.productosCarrito = carrito;
    // });

    this.productosCarrito=this.serviceCarrito.getListaProductos();

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


    loadCart() {

      console.log("LOAD CAR",this.miCarrito$)

      if(this.localStorageService.getItem("carrito")==null){
        this.localStorageService.setItem("carrito", []);
      }else{
        const storedCart: Producto[] = JSON.parse(localStorage.getItem("carrito") || '{}');
        console.log("local",storedCart);

        //añadir lista que recupero a la lista de productos que esta en el observable

        //borrar el observable

        this.serviceCarrito.deleteListaProductos();


        storedCart.forEach(producto => {
          this.serviceCarrito.añadirProducto(producto);
        
      });
      }
   
   
}

}
