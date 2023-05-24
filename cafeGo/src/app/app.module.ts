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



const appRoutes:Routes=[
  {path:"", component: LoginComponent},
  {path:"home/:IDUsuario", component:HomeComponent},
  {path:"login", component:LoginComponent},
  {path:"registro", component:RegistroComponent},
  {path:"productos", component:ProductosComponent},
 
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
