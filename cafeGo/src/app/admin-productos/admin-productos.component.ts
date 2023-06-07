import { Component } from '@angular/core';
import { Producto } from '../models/Producto';
import { ServiceProducto } from '../services/servicio-producto.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-admin-productos',
  templateUrl: './admin-productos.component.html',
  styleUrls: ['./admin-productos.component.css']
})
export class AdminProductosComponent {

  constructor(private serviceProducto: ServiceProducto, private router:Router, private route:ActivatedRoute){

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



borrarProducto(idProducto:number){
  this.serviceProducto.borrarProducto(idProducto).subscribe(data => {
    console.log(data);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/adminProducto']);
    });
  });
  
}

verProducto(idProducto: number) {
  const productoEncontrado = this.productos.find(producto => producto.IDProducto === idProducto);

  let navigationExtras: NavigationExtras= {
    queryParams: { producto: JSON.stringify(productoEncontrado) }
  };

 console.log(navigationExtras);

  this.router.navigate(['/producto'], navigationExtras)
}


}
