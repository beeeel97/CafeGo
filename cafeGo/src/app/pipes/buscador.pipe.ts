import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from '../models/Producto';


@Pipe({
  name: 'buscador'
})
export class BuscadorPipe implements PipeTransform {

  transform(productos: Producto[], filtro: string): Producto[] {
    if (!productos || !filtro) {
      return productos;
    }

    filtro = filtro.toLowerCase();
    return productos.filter(producto => {
      // Implementa tu lógica de búsqueda aquí
      // Por ejemplo, puedes buscar coincidencias en el nombre del producto
      const nombre = producto.NombreProducto.toLowerCase();
      return nombre.includes(filtro);
    });
  }

}
