import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceProducto {



  URL = "http://localhost/cafeGo/PHP/";

  constructor(private http: HttpClient) { }

  obtenerCategoriasProd() {
    return this.http.get(`${this.URL}obtenerCategorias.php `);
  }

  
 obtenerProductoByCategoria(categoria: {
  categoria: null
}) {
 // const body = { categoria: categoria }; 
 console.log(categoria);
  return this.http.post(`${this.URL}obtenerProductoByCategoria.php `, JSON.stringify(categoria));
   
 }
}
