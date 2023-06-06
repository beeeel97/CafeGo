import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cafeteria } from '../models/Cafeteria';
import { ServicioCafeteriaService } from '../services/servicio-cafeteria.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-admin-cafeteria-crear',
  templateUrl: './admin-cafeteria-crear.component.html',
  styleUrls: ['./admin-cafeteria-crear.component.css']
})
export class AdminCafeteriaCrearComponent {

  constructor(private router:Router, private serviceCafeteria: ServicioCafeteriaService){

    // registroExitoso:boolean = true; //true o false si se ha podidio o no insertar el usuario

    // //objeto con los atributos que son los campos del formulario. bananinbox/mgmodel
    // registroForm={
    //   nombre:"",
    //   propietario:"",
    //   direccion:""
    // }
    
    // registrarse(form:NgForm){
    
    //   //Comprobar que las dos contraseñas introducidas son iguales. TODO
    
    //   const nombre=form.value.nombre;
    //   const propietario=form.value.propietario;
    //   const direccion=form.value.direccion;
    
    //   // Crear un nuevo objeto de tipo Usuario
    //   let cafeteria = new Cafeteria(0, nombre, propietario, direccion);
    
    //   this.registrarCafeteria(cafeteria);
    // }
    
    // registrarCafeteria(cafeteria:Cafeteria) {
    //   this.cafeteriasServicio.registrarCafeteria(cafeteria).subscribe(data =>{
    //     this.registroExitoso = data;
    //     console.log("que me sacass", this.registroExitoso); //true o false (mensaje de feedback al usuario si no ha podidio registrarse)
    //   } )
    // }
    
     }


}
