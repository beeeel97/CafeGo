
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  URL = "http://localhost/CafeGo/PHP/";

  constructor(private http: HttpClient) { }

  obtenerUsuarios(usuario: {
      email: null; password: null; 
    }) {
    return this.http.post(`${this.URL}obtenerUsuario.php `, JSON.stringify(usuario) );
  }

  registrarUsuario(usuario: { nombre: null; apellido: null; departamento: null; email: null; password: null; }){

    console.log("llegaa",usuario);
    return this.http.post(`${this.URL}registrarUsuario.php `, JSON.stringify(usuario) );

  }


}
