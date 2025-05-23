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
import { RegistroClienteComponent } from './pages/registro_cliente/registro_cliente.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth-interceptor.interceptor';
import { DatosAdministradorComponent } from './pages/datos-administrador/datos-administrador.component';
import { ReservasComponent } from './pages/reservas/reservas.component';
import { DetallesReservaComponent } from './pages/detalles-reserva/detalles-reserva.component';
import { ReservasPersonalesComponent } from './pages/reservas-personales/reservas-personales.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { PreguntasFrecuentesComponent } from './pages/preguntas-frecuentes/preguntas-frecuentes.component';

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
    InformacionMascotaComponent,
    RegistroClienteComponent,
    DatosAdministradorComponent,
    ReservasComponent,
    DetallesReservaComponent,
    ReservasPersonalesComponent,
    AboutUsComponent,
    PreguntasFrecuentesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
