// import { Component } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Producto } from '../models/Producto';
// import { CarritoService } from '../services/carrito.service';
// import { PedidoService } from '../services/pedido.service';
// import { LocalStorageService } from '../services/local-storage.service';

// @Component({
//   selector: 'app-pedido',
//   templateUrl: './pedido.component.html',
//   styleUrls: ['./pedido.component.css']
// })
// export class PedidoComponent {

//   //queryParams

//   productosCarrito: Producto[] = []

//   idPedido!: any;
//   pedidoInsertado!: boolean;
//   feedbackUsuario = "No se ha podido realizar el pedido"


//   constructor(private route: ActivatedRoute, private router:Router,private serviceCarrito: CarritoService, private servicePedido: PedidoService, private localStorageService: LocalStorageService) { }

//   ngOnInit() {

//     this.recuperarCarritoCompra();
//     console.log(this.productosCarrito);

//   }

//   recuperarCarritoCompra() {
//     this.route.queryParams.subscribe(params => {
//       const productosString = params['productos'];
//       if (productosString) {
//         //lo pasamos de cadena Json a array
//         try {
//           const productosArray = JSON.parse(productosString);
//           // Transformar los objetos normales en instancias de Producto
//           this.productosCarrito = productosArray.map((obj: any) => new Producto(
//             obj.IDProducto,
//             obj.NombreProducto,
//             obj.Categoria,
//             obj.Frio,
//             obj.UnidadProducto,
//             obj.PrecioProducto,
//             obj.DescripcionProducto,
//             obj.LinkImagen,
//             obj.cantidad
//           ));

//           console.log("productos para hacer el pedido", this.productosCarrito)
//         } catch (error) {
//           console.error("Error al parsear los productos del carrito:", error);
//         }
//       }
//     });

//   }


//   // obtenerCantidad(id:number){
//   //   return this.serviceCarrito.obtenerCantidad(id)
//   // }

//   totalProducto(precio: number, cantidad: number) {
//     return (precio * cantidad).toFixed(2);
//     // const result = this.serviceCarrito.totalPorProducto(id);
//     // return result.toFixed(2);
//   }

//   totalCarrito() {
//     const result = this.serviceCarrito.totalCart();
//     return result.toFixed(2);
//   }

//   pagar() {

//     console.log("productos carrtio, a la hora de pagar", this.productosCarrito)

//     //sacar la fecha del dia de hoy
//     const fechaActual = new Date();
//     const fecha = fechaActual.toISOString().split('T')[0];

//     //IDUsuario
//     const idUsuario = this.localStorageService.getItem("usuario");

//     //IDCafetria (a pincho)
//     const idCafeteria = 1;

//     //insertamos pedido

//     this.insertarPedido(idUsuario, idCafeteria, fecha):


//   //instertar detalles de pedidos. //ASEGURAR LA ASINCRONIA

//     this.insertarDetallesPedido(this.idPedido, idUsuario, this.productosCarrito );

//     //vacia el carrito

//    // this.serviceCarrito.deleteListaProductos();

//     //navegar PENDIENTE
//    // this.router.navigate(['/home']);
//   }

//   insertarPedido(idUsuario:number, idCafeteria:number, fecha:string){

//        //insterta pedido y devuelve el id del pedido
//        this.servicePedido.insertarPedido(idUsuario, idCafeteria, fecha).subscribe((data:any) =>{
//         this.idPedido = data.IDPedido; 
//         console.log(this.idPedido);
       
//      });

    

//   }

//   insertarDetallesPedido(idPedido: number, idUsuario: number, detallesPedido: Producto[]) {
//     detallesPedido.forEach(producto => {
//       this.servicePedido.insertarDetallePedido(idPedido, idUsuario, producto).subscribe((data:any) =>{
//         this.pedidoInsertado = data;
//         this.feedbackUsuario = "Pedido realizado con exito"
//         console.log(data) 
//      });
//     });
//   }
  

// }


import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../models/Producto';
import { CarritoService } from '../services/carrito.service';
import { PedidoService } from '../services/pedido.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent {

  productosCarrito: Producto[] = [];

  idPedido: any;
  pedidoInsertado!: boolean;
  feedbackUsuario = "No se ha podido realizar el pedido";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serviceCarrito: CarritoService,
    private servicePedido: PedidoService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.recuperarCarritoCompra();
    console.log(this.productosCarrito);
  }

  recuperarCarritoCompra() {
    this.route.queryParams.subscribe(params => {
      const productosString = params['productos'];
      if (productosString) {
        try {
          const productosArray = JSON.parse(productosString);
          this.productosCarrito = productosArray.map((obj: any) => new Producto(
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
          console.log("productos para hacer el pedido", this.productosCarrito);
        } catch (error) {
          console.error("Error al parsear los productos del carrito:", error);
        }
      }
    });
  }

  totalProducto(precio: number, cantidad: number) {
    return (precio * cantidad).toFixed(2);
  }

  totalCarrito() {
    const result = this.serviceCarrito.totalCart();
    return result.toFixed(2);
  }

  pagar() {
    console.log("productos carrito, a la hora de pagar", this.productosCarrito);

    const fechaActual = new Date();
    const fecha = fechaActual.toISOString().split('T')[0];

    const idUsuario = this.localStorageService.getItem("usuario");
    const idCafeteria = 1;

    this.insertarPedido(idUsuario, idCafeteria, fecha); 
  }

  insertarPedido(idUsuario: number, idCafeteria: number, fecha: string) {
    this.servicePedido.insertarPedido(idUsuario, idCafeteria, fecha).subscribe((data: any) => {
      this.idPedido = data.IDPedido;
      console.log(this.idPedido);
      this.insertarDetallesPedido(this.idPedido, idUsuario, this.productosCarrito);
    });
  }

  insertarDetallesPedido(idPedido: number, idUsuario: number, detallesPedido: Producto[]) {
    detallesPedido.forEach(producto => {
      this.servicePedido.insertarDetallePedido(idPedido, idUsuario, producto).subscribe((data: any) => {
        this.pedidoInsertado = data;
        this.feedbackUsuario = "Pedido realizado con éxito";
        console.log(data);
        //Borrar el carrito
        this.serviceCarrito.deleteListaProductos();
      });
    });
  }
}
