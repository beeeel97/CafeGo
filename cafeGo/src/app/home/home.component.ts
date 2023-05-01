import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  categoria:String = "";

  //esta variable la tenemos que recuperar del opbjeto usuario al logearnos
  categorias:any=[];

  obtenerCategorias(){

    this.ServiceProducto.obtenerCategoriasProd(this.categoria).subscribe(
      result => this.categorias = result
    );
 

  }

}
