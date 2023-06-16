import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/servicio-usuario.service';
import { Usuario } from '../models/Usuario';
import { NgForm } from '@angular/forms';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  constructor(private router: Router, private usuariosServicio: UsuarioService) {

  

  }

  //Para guardar el usuario que acabamos de registar
  //usuario: U0suario | undefined;

  registroExitoso: boolean = true; //true o false si se ha podidio o no insertar el usuario
  passwordIgual!: boolean;
  feedback!: string;

  arrayCorreos=[];
chivato!:boolean;

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

      console.log(this.chivato);


     
    
    } else {
      this.passwordIgual = false;
      this.feedback = "Las contraseñas no coinciden";
    }
  }


  // registrarUsuario(usuario: Usuario) {
  //   this.comprobarCorreo().subscribe(existeCorreo => {
  //     if (existeCorreo) {
  //       this.usuariosServicio.registrarUsuario(usuario).subscribe(data => {
  //         console.log("ss",data);
  //         this.registroExitoso = data;
  //         this.feedback = "Usuario registrado correctamente";

  //         console.log("Registro exitoso:", this.registroExitoso);  

      
       
  //            this.navegarLogin();
          
          
  //       });
  //     } else {
  //       console.log("El correo ya existe en la base de datos.");
  //     }
  //   });
  // }

  registrarUsuario(usuario: Usuario) {
    this.comprobarCorreo().subscribe(existeCorreo => {
      if (existeCorreo) {
        this.usuariosServicio.registrarUsuario(usuario).subscribe(data => {
          console.log("ss", data);
          this.registroExitoso = data;
          this.feedback = "Usuario registrado correctamente";
  
          console.log("Registro exitoso:", this.registroExitoso);
          
          // this.navegarLogin();
        });
      } else {
        console.log("El correo ya existe en la base de datos.");
      }
    });
  }
  
  
  comprobarCorreo(): Observable<boolean> {
    return this.usuariosServicio.getUsuarios().pipe(
      map(data => {
        const correos = Object.values(data).map(usuario => usuario.CorreoUsuario);
        if (correos.includes(this.registroForm.email)) {
          this.feedback = "El correo ya existe en la base de datos.";
          return false;
        } else {
          return true;
        }
      })
    );
  }
  

  navegarLogin() {


      this.router.navigate(['/login']);
    

  }

}
