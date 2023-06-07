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


  return this.http.post(`${this.URL}obtenerProductoByCategoria.php `, JSON.stringify(body)) ;


 }

 obtenerProductos(){
  const body = { categoria: "TodosProductos" }; 
  return this.http.post(`${this.URL}obtenerProductoByCategoria.php `, JSON.stringify(body)) ;

 }
 borrarProducto(idProducto:number){

  const body = { idProducto: idProducto }; 
  return this.http.post(`${this.URL}borrarProducto.php`,  JSON.stringify(body));

}

modificarProducto(producto: Producto){
  console.log("en servicio",producto)
  return this.http.post(`${this.URL}modificarProducto.php`,  JSON.stringify(producto));
}




registrarProducto(producto: Producto){

  console.log("llegaa",producto);
  return this.http.post<boolean>(`${this.URL}registrarproducto.php `, JSON.stringify(producto) );

}
}
