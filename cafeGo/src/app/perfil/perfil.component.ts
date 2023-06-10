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
  passwordIgual!:boolean;
  feedback!:string;


  //objeto con los atributos que son los campos del formulario
  modificarForm = {
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    passwordRepeat: ""
  }

  //Usuario para guardar en la BBDD
  respuestaBBDD!: string;
  feedbackInsercion:String ="";


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

    console.log(this.usuario)

    let nombre = form.value.nombre;
    if (nombre == "") {
      console.log("nombre");
      nombre = this.usuario?.NombreUsuario
    }

    let email = form.value.email;
    if (email == "") {
      email = this.usuario?.CorreoUsuario
    }

    let password = form.value.password;
    if (password == "") {
      password = this.usuario?.PassUsuario
    }

    let passwordRepeat = form.value.passwordRepeat;
    if (passwordRepeat == "") {
      passwordRepeat = this.usuario?.PassUsuario
    }

    //comporbar que ambas contraseñas sea iguales

    if (password == passwordRepeat) {

      const storedUsuario = this.localStorage.getItem("usuario");

      let usuario = new Usuario(storedUsuario, nombre, email, password);

      console.log("ususario en el modificarDtos",usuario);
  
      this.modificarUsuario(usuario);
     // this.router.navigate(['/adminUsuario']);
      }else{
        this.passwordIgual=false;
        this.feedback = "Las contraseñas no coinciden"
    
      }
  }

  modificarUsuario(usuario:Usuario){

    this.serviceUsuario.modificarUsuario(usuario).subscribe(data => {

      this.respuestaBBDD = data
      console.log("true o false",this.respuestaBBDD)

      if(this.respuestaBBDD=="true"){
        this.passwordIgual=true;
        this.feedbackInsercion = "Usuario modificado correctamente"
  
      }else{
        this.feedbackInsercion = "El usuario no ha podido modificarse"
      }
      
    })
  


  }

}
