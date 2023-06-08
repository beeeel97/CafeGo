import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../models/Producto';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  URL = "http://localhost/cafeGo/PHP/";

  constructor(private http: HttpClient) { }

  insertarPedido(idUsuario:number, idCafeteria:number, fecha:string){
  //devuleva el numero de pedido y luego se lo insertemos por parametrp a insertar detalle de peido

  const body = { IDUsuarioPedido: idUsuario, IDCafeteriaPedido: idCafeteria, FechaPedido: idCafeteria }; 

  return this.http.post(`${this.URL}insertarPedido.php `, JSON.stringify(body) );

  }

  insertarDetallePedido(idPedido: number, idUsuario: number, producto: Producto){
    const body = { IDPedidoDetalle: idPedido, IDProductoDetalle : producto.IDProducto, IDUsuarioDetalle: idUsuario, CantidadProductoDetalle: producto.cantidad, PrecioProductoDetalle:producto.PrecioProducto }; 

    return this.http.post(`${this.URL}insertarDetallesPedido.php `, JSON.stringify(body) );
  

  }
}
