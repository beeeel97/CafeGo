import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Route, RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';



import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProductosComponent } from './productos/productos.component';
import { RegistroComponent } from './registro/registro.component';
import { MenuNavegacionComponent } from './menu-navegacion/menu-navegacion.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { BuscadorPipe } from './pipes/buscador.pipe';
import { CarritoComponent } from './carrito/carrito.component';
import { PedidoComponent } from './pedido/pedido.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { AdminUsuarioComponent } from './admin-usuario/admin-usuario.component';



const appRoutes:Routes=[
  {path:"", component: LoginComponent},
  {path:"home/:IDUsuario", component:HomeComponent},
  {path:"login", component:LoginComponent},
  {path:"registro", component:RegistroComponent},
  {path:"productos", component:ProductosComponent},
  {path:"pedido", component:PedidoComponent},
  {path:"administrador/:IDUsuario", component:AdministradorComponent},
  {path:"adminUsuario", component:AdminUsuarioComponent},


 
]


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProductosComponent,
    RegistroComponent,
    MenuNavegacionComponent,
    BuscadorComponent,
    BuscadorPipe,
    CarritoComponent,
    PedidoComponent,
    AdministradorComponent,
    AdminUsuarioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
