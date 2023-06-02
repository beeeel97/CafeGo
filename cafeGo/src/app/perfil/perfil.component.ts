import { Component } from '@angular/core';
import { UsuarioService } from '../services/servicio-usuario.service';
import { LocalStorageService } from '../services/local-storage.service';
import { Usuario } from '../models/Usuario';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  usuario: Usuario | undefined;

  //objeto con los atributos que son los campos del formulario
  modificarForm = {
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    passwordRepeat: ""
  }

  //Usuario para guardar en la BBDD

  usuarioBBDD!: Usuario;


  constructor(private serviceUsuario: UsuarioService, private localStorage: LocalStorageService) {
    this.getUsuarios();
  }

  getUsuarios() {
    const storedUsuario = this.localStorage.getItem("usuario");
    this.serviceUsuario.getUsuarios().subscribe((data: any) => {
      const dataArray = Object.values(data);

      this.usuario = dataArray
        .map((objeto: any) => new Usuario(
          Number(objeto.IDUsuario),
          objeto.NombreUsuario,
          objeto.CorreoUsuario,
          objeto.PassUsuario
        ))
        .find((usuario: Usuario) => usuario.IDUsuario === Number(storedUsuario));
    });
  }

  modificarDatos(form: NgForm) {

    const email = form.value.email;
    const nombre = form.value.nombre;
    const apellido = form.value.apellido;
    const password = form.value.password;
    const passwordRepeat = form.value.passwordRepeat;

    //comporbar que ambas contraseñas sea iguales

    if (password == passwordRepeat) {
      this.usuarioBBDD.NombreUsuario = nombre;
      this.usuarioBBDD.CorreoUsuario = email;
      this.usuarioBBDD.PassUsuario = password;
    }else{
      //poner alguna varible para dar feedback al usuario
    }





  }

}
