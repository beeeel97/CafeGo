import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/servicio-usuario.service';
import { Usuario } from '../models/Usuario';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  constructor(private router:Router, private usuariosServicio: UsuarioService){

  }

  //Para guardar el usuario que acabamos de registar
  //usuario: Usuario | undefined;

  registroExitoso:boolean = true; //true o false si se ha podidio o no insertar el usuario

  //objeto con los atributos que son los campos del formulario. bananinbox/mgmodel
    registroForm={
      nombre:"",
      email:"",
      password:"",
      passwordRepeat:""
    }

  registrarse(form:NgForm){

    //Comprobar que las dos contraseñas introducidas son iguales. TODO

    const email=form.value.email;
    const password=form.value.password;
    const nombre=form.value.nombre;

    // Crear un nuevo objeto de tipo Usuario
    let usuario = new Usuario(0, nombre, email, password);

    this.registrarUsuario(usuario);
    this.navegarLogin();
  }

  registrarUsuario(usuario:Usuario) {
    this.usuariosServicio.registrarUsuario(usuario).subscribe(data =>{
      this.registroExitoso = data;
      console.log("que me sacass", this.registroExitoso); //true o false (mensaje de feedback al usuario si no ha podidio registrarse)
    } )
  }



  navegarLogin(){

    if(this.registroExitoso==true){
      this.router.navigate(['/login']);
    }
 
  }

}
