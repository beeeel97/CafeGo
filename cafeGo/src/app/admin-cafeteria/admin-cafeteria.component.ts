import { Component } from '@angular/core';
import { Cafeteria } from '../models/Cafeteria';
import { ServicioCafeteriaService } from '../services/servicio-cafeteria.service';

@Component({
  selector: 'app-admin-cafeteria',
  templateUrl: './admin-cafeteria.component.html',
  styleUrls: ['./admin-cafeteria.component.css']
})
export class AdminCafeteriaComponent {
  constructor(private serviceCafeteria: ServicioCafeteriaService){

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
}