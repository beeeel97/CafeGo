import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../models/Usuario';
import { LocalStorageService } from '../services/local-storage.service';
import { UsuarioService } from '../services/servicio-usuario.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  constructor(private router: Router, private usuariosServicio: UsuarioService, private localStorageService: LocalStorageService) {

  }

  //feedback al usario
  inicioExitoso: boolean = true;

  feedback = "";

  //Objeto usuario para pasarlo como parametros a la base de datps. //PODRIA SUSTIRUIRSE POR EL MODELO

  usuario = {
    email: null,
    password: null
  };



  //objeto con los atributos que son los campos del formulario
  loginForm = {
    email: "",
    password: ""
  }

  //Variable para guadar lo que me traigo de la bbdd

  usuarios: any = [];

  //recoger los campos que vienen del formulario

  login(form: NgForm) {

    const email = form.value.email;
    const password = form.value.password;

    this.usuario.email = email;
    this.usuario.password = password;

    this.obtenerUsuarios();
    this.saveUserLocalStorage(this.usuarios[0].IDUsuario);;
    this.navegarHome();
  }

  obtenerUsuarios() {
    this.usuariosServicio.obtenerUsuarios(this.usuario).subscribe((result) => {

      if (Array.isArray(result) && result[0] == "usarioNoRegistrado") {
        this.inicioExitoso = false;
        this.feedback = "El usuario no esta registrado o la contraseña no es correcta"
      } else {
        this.usuarios = result
      }
    }
    );
  }


  navegarHome() {

    console.log("id usuario",this.usuarios[0]);

    if (this.usuarios[0].IDUsuario == 5) {
      this.router.navigate(['/administrador', this.usuarios[0].IDUsuario]);
    } else {
      console.log("id usuario............",this.usuarios[0].IDUsuario);
      this.router.navigate(['/home', this.usuarios[0].IDUsuario]);
    }

  }

  saveUserLocalStorage(idUser: number) {
    /* console.log("usuario a guardar en el localstorgae", user) */
    this.localStorageService.setItem("usuario", idUser);
  }

  


}
