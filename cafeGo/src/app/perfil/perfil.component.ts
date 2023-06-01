import { Component } from '@angular/core';
import { UsuarioService } from '../services/servicio-usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

constructor(private serviceUsuario: UsuarioService){
    this.getUsuarios();

  }

  usuarios:any=[];

  
  getUsuarios(){
    console.log("jeje", this.usuarios);
  this.serviceUsuario.getUsuarios().subscribe(
    (result) => {
      this.usuarios = result;
      console.log(this.usuarios); // Imprimir los usuarios después de asignarlos
    },
    (error) => {
      console.error(error);
    }
  );
  }



}

