import { Component } from '@angular/core';
import { Cafeteria } from '../models/Cafeteria';
import { ServicioCafeteriaService } from '../services/servicio-cafeteria.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-admin-cafeteria',
  templateUrl: './admin-cafeteria.component.html',
  styleUrls: ['./admin-cafeteria.component.css']
})
export class AdminCafeteriaComponent {
  constructor(private serviceCafeteria: ServicioCafeteriaService, private router:Router){

    this.getCafeteria();
  }

  cafeterias:Cafeteria[]=[]

  getCafeteria(){
    this.serviceCafeteria.getCafeterias().subscribe(data => {
      console.log(data);
      // Convertir las propiedades del objeto en un array
      const dataArray = Object.values(data);

      this.cafeterias = dataArray.map((objeto: any) => new Cafeteria(
        Number(objeto.IDCafeteria),
        objeto.NombreCafeteria,
        objeto.PropietarioCafeteria,
        objeto.DireccionCafeteria
      ));
    });
  }

  borrarCafeteria(idCafeteria:number){
    this.serviceCafeteria.borrarCafeteria(idCafeteria).subscribe(data => {
      console.log(data);
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/adminCafeteria']);
      });
    });
    
  }

  verCafeteria(idCafeteria: number) {
    const productoEncontrado = this.cafeterias.find(Cafeteria => Cafeteria.IDCafeteria === idCafeteria);
  
    let navigationExtras: NavigationExtras= {
      queryParams: { producto: JSON.stringify(productoEncontrado) }
    };
  
   console.log(navigationExtras);
  
    this.router.navigate(['/cafeteria'], navigationExtras)
  }
  
  

  

}