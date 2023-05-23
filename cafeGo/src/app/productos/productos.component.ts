import { Component, Input, OnInit } from '@angular/core';
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

  //fitro los productos que me vienen de la base de datos
   productosFiltrados: Producto[] = [];

   //buscador
   filterProductos ="";

   //buscador en otro componente

   @Input()
  propiedadRecibida!: string;

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

      this.productosFiltrados = this.productos;
      console.log(this.productos);
    });
  }

  terminoBusqueda: string = '';
  resultados: Producto[] = [];
  
  // buscarProductos() {
  //   this.resultados = this.productos.filter(producto =>{
  //       producto.NombreProducto.toLowerCase().includes(this.terminoBusqueda.toLowerCase());
  //         console.log(this.resultados);
  //   }
    
  //   );
  // }


}
