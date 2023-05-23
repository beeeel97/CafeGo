import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-menu-navegacion',
  templateUrl: './menu-navegacion.component.html',
  styleUrls: ['./menu-navegacion.component.css']
})
export class MenuNavegacionComponent {


  constructor(private router:Router, private route:ActivatedRoute) {
    
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

}