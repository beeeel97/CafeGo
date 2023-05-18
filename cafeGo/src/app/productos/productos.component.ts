// import { Component } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ServiceProducto } from '../services/servicio-producto.service';
// import { Producto } from '../models/Producto';

// @Component({
//   selector: 'app-productos',
//   templateUrl: './productos.component.html',
//   styleUrls: ['./productos.component.css']
// })
// export class ProductosComponent {


//   constructor(private router:Router, private route:ActivatedRoute, private ServiceProducto: ServiceProducto) {
//     this.IDUsuario = this.route.snapshot.queryParams['usuario'];
//     this.categoria = this.route.snapshot.queryParams['categoria'];

//     console.log("aqui",this.categoria)
//      this.obtenerProductoByCategoria();
    
//    }

//   //queryParams
//    IDUsuario: number;
//    categoria:string;

//    //guardar los productos que me vienen de la base de datos
//    productos: Producto[] = [];

 

//    obtenerProductoByCategoria() {
//     console.log("categoria en productos", this.categoria);
//     this.ServiceProducto.obtenerProductoByCategoria(this.categoria).subscribe(data => {

//       console.log(data)

//        // Convertir las propiedades del objeto en un array
//        const dataArray = Object.values(data);
//        console.log(dataArray);

//         this.productos = dataArray.map((objeto:any) => {
//         return new Producto(
//           Number(objeto.IDProducto),
//           objeto.NombreProducto,
//           Number(objeto.Categoria),
//           Number(objeto.Frio),
//           Number(objeto.UnidadProducto),
//           Number(objeto.PrecioProducto),
//           objeto.DescripcionProducto
//         )});
      
//       console.log( this.productos)
//     });

//   }



// }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceProducto } from '../services/servicio-producto.service';
import { Producto } from '../models/Producto';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
   //queryParams
   IDUsuario!: number;
   categoria!: string;

   //guardar los productos que me vienen de la base de datos
   productos: Producto[] = [];

  constructor(private route: ActivatedRoute, private serviceProducto: ServiceProducto) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.IDUsuario = params['usuario'];
      this.categoria = params['categoria'];

      console.log("aquí", this.categoria);
      this.obtenerProductoByCategoria();
    });
  }

  obtenerProductoByCategoria() {
    console.log("categoria en productos", this.categoria);
    this.serviceProducto.obtenerProductoByCategoria(this.categoria).subscribe(data => {
      // Convertir las propiedades del objeto en un array
      const dataArray = Object.values(data);
      this.productos = dataArray.map((objeto: any) => new Producto(
        Number(objeto.IDProducto),
        objeto.NombreProducto,
        Number(objeto.Categoria),
        Number(objeto.Frio),
        Number(objeto.UnidadProducto),
        Number(objeto.PrecioProducto),
        objeto.DescripcionProducto
      ));
      console.log(this.productos);
    });
  }
}

