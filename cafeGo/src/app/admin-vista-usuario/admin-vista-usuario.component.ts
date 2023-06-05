import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../models/Usuario';
import { UsuarioService } from '../services/servicio-usuario.service';

@Component({
  selector: 'app-admin-vista-usuario',
  templateUrl: './admin-vista-usuario.component.html',
  styleUrls: ['./admin-vista-usuario.component.css']
})
export class AdminVistaUsuarioComponent {

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
  respuestaBBDD!: boolean;
  feedbackInsercion:String ="";


  constructor(private router:Router, private route:ActivatedRoute, private serviceUsuario: UsuarioService) {
    this.getUsuario();
  }


  getUsuario() {
    this.route.queryParams.subscribe(params => {
      this.usuario = params['usuario'];
    });

   
  }

  modificarDatos(form: NgForm) {

    const email = form.value.email;
    const nombre = form.value.nombre;
    const apellido = form.value.apellido;
    const password = form.value.password;
    const passwordRepeat = form.value.passwordRepeat;

    //comprobar que ambas contraseñas sea iguales

    if (password == passwordRepeat) {
      this.usuarioBBDD.NombreUsuario = nombre;
      this.usuarioBBDD.CorreoUsuario = email;
      this.usuarioBBDD.PassUsuario = password;
    }else{
      //poner alguna varible para dar feedback al usuario
    }

    //llamar al servicio para insertar en la base de datos

    this.modificarUsuario();

  }

  modificarUsuario(){
    this.serviceUsuario.modificarUsuario(this.usuarioBBDD).subscribe(data=> data=this.respuestaBBDD)

    if(this.respuestaBBDD==true){
      this.feedbackInsercion = "Usuario modificado correctamente"

    }else{
      this.feedbackInsercion = "El usuario no ha podido modificarse"
    }
  }

  borrarUsuario(idUsuario:number){
    console.log("llega el id del usuario al borrar el usuario desde vista usuario?",idUsuario)
    this.serviceUsuario.borrarUsuario(idUsuario);
  }


}
