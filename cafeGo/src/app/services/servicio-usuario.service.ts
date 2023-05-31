
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/Usuario';

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

  registrarUsuario(usuario: Usuario){

    console.log("llegaa",usuario);
    return this.http.post<boolean>(`${this.URL}registrarUsuario.php `, JSON.stringify(usuario) );

  }

  getUsuarios(){
    return this.http.get(`${this.URL}obtenerTodosUsuario.php` );
  }


}
