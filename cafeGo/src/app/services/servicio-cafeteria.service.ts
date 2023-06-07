import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cafeteria } from '../models/Cafeteria';

@Injectable({
  providedIn: 'root'
})
export class ServicioCafeteriaService {

  URL = "http://localhost/CafeGo/PHP/";

  constructor(private http: HttpClient) { 
    
  }

  getCafeterias(){
    return this.http.get(`${this.URL}obtenerTodasCafeterias.php` );
  }

  registrarCafeteria(cafeteria: Cafeteria){

    console.log("llegaa",cafeteria);
    return this.http.post<boolean>(`${this.URL}registrarCafeteria.php `, JSON.stringify(cafeteria) );

  }



}
