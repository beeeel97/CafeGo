

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

  feedbackCarritoVacio="";
  feedbackCarritoVacioBoolean!:boolean;

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
    //Navegar para realizar el pago

    if(this.productosCarrito.length ==0){
      this.feedbackCarritoVacioBoolean = true;
      this.feedbackCarritoVacio = "No hay productos en el carrito. Por favor añada productos."
    }else{
      this.router.navigate(['/pasarelaPago']);
    }
   

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
     
      });

    });

    
     //Borrar el carrito
    this.serviceCarrito.deleteListaProductos();
    this.localStorageService.removeItem("carrito");
    this.productosCarrito=[];
    console.log("se ha borrado el carritot", this.productosCarrito);
  }
}
