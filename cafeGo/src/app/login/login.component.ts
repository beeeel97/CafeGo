import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/servicio-usuario.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  constructor(private router:Router, private usuariosServicio: UsuarioService) {
    // this.obtenerUsuarios();
   }

   //Objeto usuario para pasarlo como parametros a la base de datps

   usuario={
    email:null,
    password:null
   };



    //objeto con los atributos que son los campos del formulario
    loginForm={
      email:"",
      password:""
      }

        //Variable para guadar lo que me traigo de la bbdd

  usuarios:any=[];

    //recoger los campos que vienen del formulario

    login(form:NgForm){

      const email=form.value.email;
      const password=form.value.password;
  
      this.usuario.email = email;
      this.usuario.password=password;
      
  
      console.log(this.usuario);
      this.obtenerUsuarios();
       this.navegarHome();
    }

    obtenerUsuarios() {

      this.usuariosServicio.obtenerUsuarios(this.usuario).subscribe(
        (result) => (this.usuarios = result)
      );
      console.log("hola",this.usuarios)
     // console.log(this.usuarios[0].codUsu);
    }
  
  
    navegarHome(){
      if(this.usuarios[0].IDUsuario == 9){
        this.router.navigate(['/gestionarIncidenciasAdmin']);
      }else{
        this.router.navigate(['/home', this.usuarios[0].IDUsuario]);
    }
  
    }
  
    
}
