import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { MenuUsuarioComponent } from './pages/menu_usuario/menu_usuario.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ActualizarUsuarioComponent } from './pages/actualizar_usuario/actualizar_usuario.component';
import { RazaComponent } from './pages/raza/raza.component';
import { CommonModule } from '@angular/common';
import { MascotasPorRazaComponent } from './pages/mascotas-por-raza/mascotas-por-raza.component';
import { MenuAdministradorComponent } from './pages/menu_administrador/menu_administrador.component';
import { AddMascotaComponent } from './pages/add_mascota/add_mascota.component';
import { SelectorRolComponent } from './pages/selector-rol/selector-rol.component';
import { LoginClienteComponent } from './pages/login-cliente/login-cliente.component';
import { LoginAdministradorComponent } from './pages/login-administrador/login-administrador.component';
import { MascotasComponent } from './pages/mascotas/mascotas.component';
import { InformacionMascotaComponent } from './pages/informacion_mascota/informacion_mascota.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    MenuUsuarioComponent,
    InicioComponent,
    ActualizarUsuarioComponent,
    RazaComponent,
    MascotasPorRazaComponent,
    MenuAdministradorComponent,
    AddMascotaComponent,
    SelectorRolComponent,
    LoginClienteComponent,
    LoginAdministradorComponent,
    MascotasComponent,
    InformacionMascotaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
