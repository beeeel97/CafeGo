import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceProducto } from '../services/servicio-producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {


  constructor(private router:Router, private route:ActivatedRoute, private ServiceProducto: ServiceProducto) {
    this.IDUsuario = this.route.snapshot.queryParams['usuario'];
  this.categoria.categoria = this.route.snapshot.queryParams['categoria'];
  console.log("categoria en productos", this.categoria.categoria);
  this.obtenerProductoByCategoria();
    
   }
 

   IDUsuario: number;
   categoria:any={
    categoria:""
   }

   obtenerProductoByCategoria() {
    console.log("categoria en productos", this.categoria);
    this.ServiceProducto.obtenerProductoByCategoria(this.categoria).subscribe();
  }




  

}
