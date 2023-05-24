import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CarritoService } from '../services/carrito.service';

@Component({
  selector: 'app-menu-navegacion',
  templateUrl: './menu-navegacion.component.html',
  styleUrls: ['./menu-navegacion.component.css']
})
export class MenuNavegacionComponent {


  constructor(private router:Router, private route:ActivatedRoute, private serviceCarrito: CarritoService) {
    
   }

   //IDUsuario habria que recogerlo del local storage, demomento pongo uno a pincho

   IDUsuario:number =1

    categoriaNavegacion: string ="";

    navegarMenuCategoria(evento: Event){
  
      //recuperar la palabra snack
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
      
       const url = `/productos?categoria=${this.categoriaNavegacion}&usuario=${this.IDUsuario}`;
       this.router.navigateByUrl(url);

       
      }

      navegarHome(){}

      //CARRITO

    //observable de mi carrito para actualizar el numero de productos en el carrito

    miCarrito$ = this.serviceCarrito.miCarrito$;
    
    //para que se muestre o no el carrito
    viewCart: boolean = false;

    //myCart$ = this.storeService.myCart$;

    onToggleCart() {
    this.viewCart = !this.viewCart
    };

}
