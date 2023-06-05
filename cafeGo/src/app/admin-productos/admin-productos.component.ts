import { Component } from '@angular/core';
import { Producto } from '../models/Producto';
import { ServiceProducto } from '../services/servicio-producto.service';

@Component({
  selector: 'app-admin-productos',
  templateUrl: './admin-productos.component.html',
  styleUrls: ['./admin-productos.component.css']
})
export class AdminProductosComponent {

  constructor(private serviceProducto: ServiceProducto){

    this.getProducts();  }

  productos:Producto[]=[]

  getProducts(){
    this.serviceProducto.obtenerProductos().subscribe(data => {
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
        objeto.DescripcionProducto,
        0 // cantidad que el usuario luego añada al carrito
      ));
    });
  }

}
