import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../models/Usuario';
import { UsuarioService } from '../services/servicio-usuario.service';
import { Producto } from '../models/Producto';
import { ServiceProducto } from '../services/servicio-producto.service';

@Component({
  selector: 'app-admin-vista-producto',
  templateUrl: './admin-vista-producto.component.html',
  styleUrls: ['./admin-vista-producto.component.css']
})
export class AdminVistaProductoComponent {

  producto: Producto | undefined = undefined;

  //objeto con los atributos que son los campos del formulario
  modificarForm = {
    nombre: this.producto?.NombreProducto,
    categoria: String(this.producto?.Categoria),
    frio: this.producto?.Frio,
    unidad: this.producto?.UnidadProducto,
    precio: this.producto?.PrecioProducto,
    descripcion: this.producto?.DescripcionProducto,
    linkImagen: this.producto?.LinkImagen,
  }

  //Producto para guardar en la BBDD

  productoBBDD!: Producto;
  respuestaBBDD!: string;
  feedbackInsercion: String = "";


  constructor(private router: Router, private route: ActivatedRoute, private serviceProducto: ServiceProducto) {
    this.getProducto();
  }


  getProducto() {
    this.route.queryParams.subscribe(params => {
      this.producto = JSON.parse(params['producto']);
    });


  }

  modificarDatos(form: NgForm, idProducto: number) {


    let nombre = form.value.nombre;
    if (nombre == undefined) {
      nombre = this.producto?.NombreProducto
    }
    let categoria = form.value.categoria;
    if (categoria == undefined) {
      categoria = this.producto?.Categoria
    }

    let frio = form.value.frio;
    if (frio == undefined) {
      frio = this.producto?.Frio
    }

    let unidad = form.value.unidad;
    if (unidad == undefined) {
      unidad = this.producto?.UnidadProducto
    }

    let precio = form.value.precio;
    if (precio == undefined) {
      precio = this.producto?.PrecioProducto
    }

    let descripcion = form.value.descripcion;
    if (descripcion == undefined) {
      descripcion = this.producto?.DescripcionProducto
    }
    let linkImagen = form.value.linkImagen;
    if (linkImagen == undefined) {
      linkImagen = this.producto?.LinkImagen
    }


      if (this.productoBBDD) {
        // Si this.productoBBDD ya tiene un valor asignado
        this.productoBBDD.NombreProducto = nombre;
        this.productoBBDD.DescripcionProducto = descripcion;
        this.productoBBDD.Frio = frio;
        this.productoBBDD.LinkImagen = linkImagen;
        this.productoBBDD.DescripcionProducto= descripcion;
        this.productoBBDD.UnidadProducto = unidad;
        this.productoBBDD.PrecioProducto = precio;
        this.productoBBDD.Categoria = categoria;
        this.productoBBDD.cantidad = 0;

      
      } else {
        // Si this.productoBBDD no tiene un valor asignado, crea un nuevo objeto Producto
        this.productoBBDD = {
          IDProducto: idProducto,
          NombreProducto: nombre,
          DescripcionProducto: descripcion,
          Frio: frio,
          LinkImagen: linkImagen,
          UnidadProducto: unidad,
          PrecioProducto: precio,
          Categoria: categoria,
          cantidad:0
        };
      }
    

    this.modificarProductos();

  }

  modificarProductos() {
    console.log("esta categoria",this.productoBBDD)
    this.serviceProducto.modificarProducto(this.productoBBDD).subscribe(data => {

      this.respuestaBBDD = data as string;
      if (data == "true") {
        this.feedbackInsercion = "Producto modificado correctamente"

      } else {
        this.feedbackInsercion = "El producto no ha podido modificarse"
      }
    })

  }

  borrarProducto(idProducto:number){
    this.serviceProducto.borrarProducto(idProducto).subscribe(data => {
      console.log(data);
      this.router.navigate(['/adminProducto'])
    });
    
  }


}

