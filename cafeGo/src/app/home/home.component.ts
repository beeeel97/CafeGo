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
  obtenerValorInputOculto(evento: Event) {
    let value = (<HTMLInputElement>evento.target).value;
    this.categoria = value;
    console.log("que categoria he seleccionado", this.categoria)
      }


  productos(evento: Event){

    this.obtenerValorInputOculto(evento);
    this.navegarProductos();

  }

  navegarProductos(){
    let navigationExtras: NavigationExtras= {
      queryParams: { categoria: this.categoria, usuario: this.IDUsuario.IDUsuario }
    };

   console.log(navigationExtras);
  
    this.router.navigate(['/productos'], navigationExtras);
  }

  
}
