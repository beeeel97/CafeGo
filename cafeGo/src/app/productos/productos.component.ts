import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceProducto } from '../services/servicio-producto.service';
import { Producto } from '../models/Producto';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {


  constructor(private router:Router, private route:ActivatedRoute, private ServiceProducto: ServiceProducto) {
    this.IDUsuario = this.route.snapshot.queryParams['usuario'];
    this.categoria = this.route.snapshot.queryParams['categoria'];
  this.obtenerProductoByCategoria();
    
   }

  //queryParams
   IDUsuario: number;
   categoria:string;

   //guardar los productos que me vienen de la base de datos
   productos: Producto[] = [];

 

   obtenerProductoByCategoria() {
    console.log("categoria en productos", this.categoria);
    this.ServiceProducto.obtenerProductoByCategoria(this.categoria).subscribe(data => {

      console.log(data)

       // Convertir las propiedades del objeto en un array
       const dataArray = Object.values(data);
       console.log(dataArray);

        this.productos = dataArray.map((objeto:any) => {
        return new Producto(
          Number(objeto.IDProducto),
          objeto.NombreProducto,
          Number(objeto.Categoria),
          Number(objeto.Frio),
          Number(objeto.UnidadProducto),
          Number(objeto.PrecioProducto),
          objeto.DescripcionProducto
        )});
      
      console.log( this.productos)
    });
  }

}
