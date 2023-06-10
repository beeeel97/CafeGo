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

  constructor(private router: Router, private usuariosServicio: UsuarioService) {

  }

  //Para guardar el usuario que acabamos de registar
  //usuario: Usuario | undefined;

  registroExitoso: boolean = true; //true o false si se ha podidio o no insertar el usuario
  passwordIgual!: boolean;
  feedback!: string;

  //objeto con los atributos que son los campos del formulario. bananinbox/mgmodel
  registroForm = {
    nombre: "",
    email: "",
    password: "",
    passwordRepeat: ""
  }

  registrarse(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    const passwordRepeat = form.value.passwordRepeat;
    const nombre = form.value.nombre;

    // Comprobar que los campos no estén vacíos
    if (email.trim() === "" || password.trim() === "" || passwordRepeat.trim() === "" || nombre.trim() === "") {
      this.feedback = "Todos los campos son obligatorios";
      console.log("llega");
      return;
    }

    if (password === passwordRepeat) {
      // Validar correo electrónico con extensión "@educamadrid.es"
      const emailRegex = /^[a-zA-Z0-9._%+-]+@educamadrid\.es$/;
      if (!emailRegex.test(email)) {
        this.feedback = "Introduzca un correo electrónico válido con la extensión @educamadrid.es";
        return;
      }



      // Crear un nuevo objeto de tipo Usuario
      const usuario = new Usuario(0, nombre, email, password);
      this.registrarUsuario(usuario);
      this.navegarLogin();
    } else {
      this.passwordIgual = false;
      this.feedback = "Las contraseñas no coinciden";
    }
  }


  registrarUsuario(usuario: Usuario) {
    this.usuariosServicio.registrarUsuario(usuario).subscribe(data => {
      this.registroExitoso = data;
      console.log("que me sacass", this.registroExitoso); //true o false (mensaje de feedback al usuario si no ha podidio registrarse)
    })
  }



  navegarLogin() {

    if (this.registroExitoso == true) {
      this.router.navigate(['/login']);
    }

  }

}
