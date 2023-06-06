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

  usuario: Usuario | undefined=undefined;

  //objeto con los atributos que son los campos del formulario
  modificarForm = {
    nombre: this.usuario?.NombreUsuario,
    apellido: this.usuario?.NombreUsuario,
    email: this.usuario?.CorreoUsuario,
    password: this.usuario?.PassUsuario,
    passwordRepeat: this.usuario?.PassUsuario
  }

  //Usuario para guardar en la BBDD

  usuarioBBDD!: Usuario;
  respuestaBBDD!: string;
  feedbackInsercion:String ="";


  constructor(private router:Router, private route:ActivatedRoute, private serviceUsuario: UsuarioService) {
    this.getUsuario();
    console.log(this.usuario);
  }


  getUsuario() {
    this.route.queryParams.subscribe(params => {
      this.usuario = JSON.parse(params['usuario']);
    });

   
  }

  modificarDatos(form: NgForm, idUsuario:number ) {


    let email = form.value.email;
    if (email == undefined){
      email = this.usuario?.CorreoUsuario
    }
    let nombre = form.value.nombre;
    if (nombre == undefined){
      nombre = this.usuario?.NombreUsuario
    }
 
    let apellido = form.value.apellido;
    if (apellido == undefined){
      apellido = this.usuario?.NombreUsuario
    }
    let password = form.value.password;
    if (password == undefined){
      password = this.usuario?.PassUsuario
    }
    let passwordRepeat = form.value.passwordRepeat;
    if (passwordRepeat == undefined){
      passwordRepeat = this.usuario?.PassUsuario
    }

    //comprobar que ambas contraseñas sea iguales)
    if (password == passwordRepeat) {
      if (this.usuarioBBDD) {
        // Si this.usuarioBBDD ya tiene un valor asignado
        this.usuarioBBDD.NombreUsuario = nombre;
        this.usuarioBBDD.CorreoUsuario = email;
        this.usuarioBBDD.PassUsuario = password;
      } else {
        // Si this.usuarioBBDD no tiene un valor asignado, crea un nuevo objeto Usuario
        this.usuarioBBDD = {
          IDUsuario:idUsuario,
          NombreUsuario: nombre,
          CorreoUsuario: email,
          PassUsuario: password
        };
      }
    } 

    this.modificarUsuario();

  }

  modificarUsuario(){
    this.serviceUsuario.modificarUsuario(this.usuarioBBDD).subscribe(data=> {

      this.respuestaBBDD = data as string;
      if(data=="true"){
      this.feedbackInsercion = "Usuario modificado correctamente"

    }else{
      this.feedbackInsercion = "El usuario no ha podido modificarse"
    }
    })
    
  }

  borrarUsuario(idUsuario:number){
    this.serviceUsuario.borrarUsuario(idUsuario).subscribe(data=> console.log(data));
    this.router.navigate(['/adminUsuario'])

  }


}
