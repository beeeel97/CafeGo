import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ServiceProducto } from '../services/servicio-producto.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router:Router, private route:ActivatedRoute, private ServiceProducto: ServiceProducto) {
    this.IDUsuario.IDUsuario = this.route.snapshot.params['IDUsuario'];
    this.obtenerCategorias()
   }

   IDUsuario:any={
    IDUsuario:""
  };

  categoria:String = ""; //guarda el valor del inputHidden 

  categorias:any=[];

  obtenerCategorias(){

    this.ServiceProducto
    .obtenerCategoriasProd()
    .subscribe((result) => {
        this.categorias = result;
    });

  }

  //Recuperar el valor oculto del input (categoria)
  obtenerValorInputOculto() {
    console.log("categoria?")
   
        const inputOculto = document.getElementById('inputHiddenCategoria') as HTMLInputElement;
        this.categoria = inputOculto.value;
        console.log(this.categoria)
      }

  productos(form:NgForm){
    console.log("sdfs")

    this.obtenerValorInputOculto();

    this.navegarProductos();

  }

  navegarProductos(){
    let navigationExtras = {
      queryParams: { categoria: this.categoria, usuario: this.IDUsuario.IDUsuario }
    };

    console.log("entra")

   console.log(navigationExtras);
  
    this.router.navigate(['/productos'], navigationExtras);
  }
  
}
