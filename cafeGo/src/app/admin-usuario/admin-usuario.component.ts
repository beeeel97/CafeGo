import { Component } from '@angular/core';
import { UsuarioService } from '../services/servicio-usuario.service';
import { Usuario } from '../models/Usuario';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-admin-usuario',
  templateUrl: './admin-usuario.component.html',
  styleUrls: ['./admin-usuario.component.css']
})
export class AdminUsuarioComponent {


  constructor(private router:Router, private route:ActivatedRoute, private serviceUsuario: UsuarioService){
    this.getUsuarios();

  }

  usuarios:Usuario[] = [];

  
  getUsuarios(){
  this.serviceUsuario.getUsuarios().subscribe(data => {
    console.log("este es el data",data);
    // Convertir las propiedades del objeto en un array
    const dataArray = Object.values(data);

    this.usuarios = dataArray.map((objeto: any) => new Usuario(
      Number(objeto.IDUsuario),
      objeto.NombreUsuario,
      objeto.CorreoUsuario,
      objeto.PassUsuario
    
    ));
    console.log(this.usuarios.length); // Imprimir la cantidad de usuarios obtenidos

  }

  )

}

borrarUsuario(idUsuario:number){
  this.serviceUsuario.borrarUsuario(idUsuario);
}

verUsuario(idUsuario: number) {
  const usuarioEncontrado = this.usuarios.find(usuario => usuario.IDUsuario === idUsuario);

  let navigationExtras: NavigationExtras= {
    queryParams: { usuario: usuarioEncontrado }
  };

 console.log(navigationExtras);

  this.router.navigate(['/usuario'], navigationExtras)
}



}
