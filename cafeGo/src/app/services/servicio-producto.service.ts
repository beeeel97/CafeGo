import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../models/Producto';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceProducto {



  URL = "http://localhost/cafeGo/PHP/";

  constructor(private http: HttpClient) { }

  obtenerCategoriasProd() {
    return this.http.get(`${this.URL}obtenerCategorias.php `);
  }

  
 obtenerProductoByCategoria(categoria: string) {
  const body = { categoria: categoria }; 
 console.log("estoy en el servicio",categoria)

 const productos: Producto[] = [
  new Producto(
    1,
    "Producto 1",
    1,
    0,
    1,
    10,
    "Descripción del producto 1",
    0
  ),
  new Producto(
    2,
    "Producto 2",
    2,
    1,
    2,
    20,
    "Descripción del producto 2",
    0
  )
];

 // return this.http.post(`${this.URL}obtenerProductoByCategoria.php `, JSON.stringify(body)) ;
 return of(productos);
   
 }
}
