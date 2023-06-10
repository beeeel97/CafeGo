import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceProducto } from '../services/servicio-producto.service';
import { Producto } from '../models/Producto';
import { CarritoService } from '../services/carrito.service';
import { LocalStorageService } from '../services/local-storage.service';

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

   //Filtro del select
   filtrosSeleccionado="";

   //buscador en otro componente

   @Input()
  propiedadRecibida!: string;

  constructor(private route: ActivatedRoute, private serviceProducto: ServiceProducto, private serviceCarrito: CarritoService, private localStorage: LocalStorageService) { }

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


      console.log(data);
      // Convertir las propiedades del objeto en un array
      const dataArray = Object.values(data);

      this.productos = dataArray.map((objeto: any) => new Producto(
        Number(objeto.IDProducto),
        objeto.NombreProducto,
        Number(objeto.Categoria),
        Number(objeto.Frio),
        Number(objeto.UnidadProducto),
        Number(objeto.PrecioProducto),
        objeto.DescripcionProducto,
       objeto.LinkImagen,
       0 //cantidad que el usuario luego añada al carrito
      ));

  

      this.productosFiltrados = this.productos;
      console.log(this.productos);
    });
  }

  terminoBusqueda: string = '';
  resultados: Producto[] = [];
  

  filtroProductos(){
 
    if(this.filtrosSeleccionado=="alfabetico"){

    this.productosFiltrados = this.productosFiltrados
    .slice()
    .sort((producto1, producto2) => producto1.NombreProducto.localeCompare(producto2.NombreProducto));

    }else if(this.filtrosSeleccionado=="alfabeticoinverso"){
      this.productosFiltrados = this.productosFiltrados
      .slice()
      .sort((producto1, producto2) => producto2.NombreProducto.localeCompare(producto1.NombreProducto));

    }else if(this.filtrosSeleccionado=="preciomas"){
      this.productosFiltrados = this.productosFiltrados
      .slice()
      .sort((producto1, producto2) => producto2.PrecioProducto - producto1.PrecioProducto);
     

    }else if(this.filtrosSeleccionado=="preciomenos"){
      this.productosFiltrados = this.productosFiltrados
      .slice()
      .sort((producto1, producto2) => producto1.PrecioProducto - producto2.PrecioProducto);
      

    }
  }

  //Añadir productos al carrito

  anadirProductoCarrito(producto: Producto){

    this.serviceCarrito.añadirProducto(producto);
    //guardar en el localStorage
    this.localStorage.actualizarLocalStorage(producto, "añadir");

  }



}
