import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MascotaComponent } from './pages/mascota/mascota.component';
import { AdministradorComponent } from './pages/administrador/administrador.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { ReservaComponent } from './pages/reserva/reserva.component';
import { RazaComponent } from './pages/raza/raza.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MascotaComponent,
    AdministradorComponent,
    ClienteComponent,
    ReservaComponent,
    RazaComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
