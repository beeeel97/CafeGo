import { Injectable } from '@angular/core';
import { Producto } from '../models/Producto';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    const value = localStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
    return null;
  }


  removeItem(key: string): void {
    localStorage.removeItem(key);
  }


  actualizarLocalStorage(producto: Producto, accion: String) {
    if (typeof Storage !== "undefined") {
      let carrito: Producto[] | null = JSON.parse(localStorage.getItem("carrito") || "null");
      if (!carrito) {
        carrito = [];
      }
      switch (accion) {
        case "añadir":
          carrito.push(producto);
          break;
        case "borrar":
          const index = carrito.findIndex(item => item.IDProducto === producto.IDProducto);
          if (index !== -1) {
            carrito.splice(index, 1); // Elimina el producto del carrito por su índice
          }
          break;
        case "borrarTodos":
          const indexList: number[] = [];
          carrito.forEach((item, index) => {
            if (item.IDProducto === producto.IDProducto) {
              indexList.push(index);
            }
          });

          // Elimina los productos del carrito en orden inverso
          for (let i = indexList.length - 1; i >= 0; i--) {
            carrito.splice(indexList[i], 1);
          }
          break;

        default:
          break;
      }

      localStorage.setItem("carrito", JSON.stringify(carrito));
    } else {
      console.log("El almacenamiento local no es compatible.");
    }
  }





}
