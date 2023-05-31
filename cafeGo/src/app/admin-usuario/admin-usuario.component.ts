import { Component } from '@angular/core';
import { UsuarioService } from '../services/servicio-usuario.service';

@Component({
  selector: 'app-admin-usuario',
  templateUrl: './admin-usuario.component.html',
  styleUrls: ['./admin-usuario.component.css']
})
export class AdminUsuarioComponent {


  constructor(private serviceUsuario: UsuarioService){
    this.getUsuarios();

  }

  getUsuarios(){
    this.serviceUsuario.getUsuarios();
  }

}
