import { Injectable } from '@angular/core';
import { Producto } from '../models/Producto';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor() { }

  //lista de productos al carrito (lo emito por prodctos y lo escucho en carrito)
  
  private listaProductos: Producto[] = [];

  //carrito observable

  private miCarrito = new BehaviorSubject<Producto[]>([]);

  //Observable
  miCarrito$ = this.miCarrito.asObservable();

  //Añadir producto cuando pinche en el boton de product

  añadirProducto(product:Producto){

      if (this.listaProductos.length === 0) {
        product.cantidad = 1;
        this.listaProductos.push(product);
        //emito la lista para los que estén escuchando
        this.miCarrito.next(this.listaProductos);
  
      } else {
        const productMod = this.listaProductos.find((element) => {
          return element.IDProducto === product.IDProducto
        })

        //si el producto esta en la lista aumentamos la cantidad
        if (productMod) {
          productMod.cantidad = productMod.cantidad + 1;
          this.miCarrito.next(this.listaProductos);
        } else { //si no esta en la lista lo añadimos al array y cantidad a 1
          product.cantidad = 1;
          this.listaProductos.push(product);
          this.miCarrito.next(this.listaProductos);
        }
  
      }

  }

  findProductById(id: number) {
    return this.listaProductos.find((product) => {
      return product.IDProducto === id
    })

  }

  deleteProduct(id: number) {
    this.listaProductos = this.listaProductos.filter((product) => {
      return product.IDProducto != id
    })
    this.miCarrito.next(this.listaProductos);


  }
 
  //metodo para el componente pedido se renderice al vuelo
  // obtenerCantidad( id:number){

  //   const producto = this.listaProductos.filter((product) => {
  //     return product.IDProducto = id
  //   })

  //   console.log(producto[0]);

  //   return producto[0].cantidad;

  // }

  //metodo para el componente pedido se renderice al vuelo

  // totalPorProducto(id:number){

  //   const producto = this.listaProductos.filter((product) => {
  //     return product.IDProducto = id;
  //   })

  //   return producto[0].cantidad*producto[0].PrecioProducto;
  
  // }


  totalCart() {
    const total = this.listaProductos.reduce(function (acc, product) { return acc + (product.cantidad * product.PrecioProducto); }, 0)
    return total
  }
}
