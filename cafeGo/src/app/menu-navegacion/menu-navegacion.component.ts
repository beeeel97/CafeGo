import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CarritoService } from '../services/carrito.service';
import { LocalStorageService } from '../services/local-storage.service';
import { UsuarioService } from '../services/servicio-usuario.service';
import { Usuario } from '../models/Usuario';

@Component({
  selector: 'app-menu-navegacion',
  templateUrl: './menu-navegacion.component.html',
  styleUrls: ['./menu-navegacion.component.css']
})
export class MenuNavegacionComponent {


  constructor(private router:Router, private route:ActivatedRoute,private serviceUsuario:UsuarioService, private serviceCarrito: CarritoService, private localStorageService: LocalStorageService) {
   console.log("dddd",this.IDUsuario)
   this.mostrarUsuario();
   }


   IDUsuario:number =this.localStorageService.getItem("usuario");
   usuario: Usuario | undefined;
   nombreUsuario!:string;

   categoriaNavegacion: string ="";

    navegarMenuCategoria(evento: Event){
  
      //recuperar la palabra de la categoria
      this.obtenerValorButton(evento);
      this.navegarProductos();
  
      //navegar a productos pasandole ese query params
  
    }

     //Recuperar el valor del input (categoria)
     obtenerValorButton(evento: Event) {
        let value = (<HTMLInputElement>evento.target).value;
        this.categoriaNavegacion = value;
      }
    
      navegarProductos(){
        let navigationExtras: NavigationExtras= {
          queryParams: { categoria: this.categoriaNavegacion, usuario: this.IDUsuario }
        };
    
       console.log(navigationExtras);

       this.router.navigate(['/productos'], navigationExtras);
      
      //  const url = `/productos?categoria=${this.categoriaNavegacion}&usuario=${this.IDUsuario}`;
      //  this.router.navigateByUrl(url);

       
      }

      navegarHome(){

      let IDUsuario=  this.localStorageService.getItem("usuario");

      this.router.navigate([`/home/${IDUsuario}`]);
      }



      //CARRITO

    //observable de mi carrito para actualizar el numero de productos en el carrito

    miCarrito$ = this.serviceCarrito.miCarrito$;
    
    //para que se muestre o no el carrito
    viewCart: boolean = false;

    onToggleCart() {
    this.viewCart = !this.viewCart
    };

    //CERRARSESION

    cerrarSesion(){

      this.serviceCarrito.deleteListaProductos();
      this.localStorageService.removeItem("usuario");
      this.localStorageService.removeItem("carrito");
      this.router.navigate(['/login']);

    }

    mostrarUsuario() {
      this.serviceUsuario.getUsuarios().subscribe((data: any) => {
        const dataArray = Object.values(data);
  
        this.usuario = dataArray
          .map((objeto: any) => new Usuario(
            Number(objeto.IDUsuario),
            objeto.NombreUsuario,
            objeto.CorreoUsuario,
            objeto.PassUsuario
          ))
          .find((usuario: Usuario) => usuario.IDUsuario === Number(this.IDUsuario));

          this.nombreUsuario = this.usuario?.NombreUsuario ?? '';

      });
    }

}
