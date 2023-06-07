import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceProducto } from '../services/servicio-producto.service';
import { NgForm } from '@angular/forms';
import { Producto } from '../models/Producto';

@Component({
  selector: 'app-admin-crear-producto',
  templateUrl: './admin-crear-producto.component.html',
  styleUrls: ['./admin-crear-producto.component.css']
})
export class AdminCrearProductoComponent {

  constructor(private router:Router, private productoServicio: ServiceProducto){
  }
  
  registroExitoso:boolean = true; //true o false si se ha podidio o no insertar el usuario
  feedback:string="";
  passwordIgual:boolean=true;
  
  //objeto con los atributos que son los campos del formulario. bananinbox/mgmodel
  registroForm={
    nombre: "",
    categoria: 0,
    frio: 0,
    unidad: 0,
    precio: 0,
    descripcion: "",
    linkImagen: ""
  }
  
  registrarse(form:NgForm){

    const nombre = form.value.nombre;
    const categoria = form.value.categoria;
    const frio = form.value.frio;
    const unidad = form.value.unidad;
    const precio = form.value.precio;
    const descripcion = form.value.descripcion;
    const linkImagen = form.value.linkImagen;
  
  
 
    let producto = new Producto(0, nombre, categoria, frio, unidad, precio, descripcion, linkImagen,0);

    this.registrarProducto(producto);
    this.router.navigate(['/adminProducto']);
  
  
  }
  
  registrarProducto(producto:Producto) {
    console.log(producto)
    this.productoServicio.registrarProducto(producto).subscribe(data =>{
    
      this.registroExitoso = data;
  
    } )
  }
  

}
