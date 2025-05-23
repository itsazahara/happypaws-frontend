import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes, Scroll } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MenuUsuarioComponent } from './pages/menu_usuario/menu_usuario.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ActualizarUsuarioComponent } from './pages/actualizar_usuario/actualizar_usuario.component';
import { RazaComponent } from './pages/raza/raza.component';
import { MascotasPorRazaComponent } from './pages/mascotas-por-raza/mascotas-por-raza.component';
import { MenuAdministradorComponent } from './pages/menu_administrador/menu_administrador.component';
import { AddMascotaComponent } from './pages/add_mascota/add_mascota.component';
import { SelectorRolComponent } from './pages/selector-rol/selector-rol.component';
import { LoginClienteComponent } from './pages/login-cliente/login-cliente.component';
import { LoginAdministradorComponent } from './pages/login-administrador/login-administrador.component';
import { MascotasComponent } from './pages/mascotas/mascotas.component';
import { InformacionMascotaComponent } from './pages/informacion_mascota/informacion_mascota.component';
import { RegistroClienteComponent } from './pages/registro_cliente/registro_cliente.component';
import { DatosAdministradorComponent } from './pages/datos-administrador/datos-administrador.component';
import { ReservasComponent } from './pages/reservas/reservas.component';
import { DetallesReservaComponent } from './pages/detalles-reserva/detalles-reserva.component';
import { ReservasPersonalesComponent } from './pages/reservas-personales/reservas-personales.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { PreguntasFrecuentesComponent } from './pages/preguntas-frecuentes/preguntas-frecuentes.component';
import { ViewportScroller } from '@angular/common';
import { filter } from 'rxjs';

const routes: Routes = [
  { path: 'menu_usuario', component: MenuUsuarioComponent },
  { path: 'actualizar_usuario', component: ActualizarUsuarioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'raza', component: RazaComponent },
  { path: 'mascotas-por-raza/:id', component: MascotasPorRazaComponent },
  { path: 'menu_administrador', component: MenuAdministradorComponent },
  { path: 'add_mascota', component: AddMascotaComponent },
  { path: 'selector-rol', component: SelectorRolComponent },
  { path: 'login-cliente', component: LoginClienteComponent },
  { path: 'login-admin', component: LoginAdministradorComponent },
  { path: 'mascotas', component: MascotasComponent },
  { path: 'adoptar_mascota/:id', component: InformacionMascotaComponent },
  { path: 'registro', component: RegistroClienteComponent },
  { path: 'datos_administrador', component: DatosAdministradorComponent },
  { path: 'reservas', component: ReservasComponent },
  { path: 'detalles-reserva/:id', component: DetallesReservaComponent },
  { path: 'reservas-personales/:id', component: ReservasPersonalesComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'preguntas-frecuentes', component: PreguntasFrecuentesComponent },
  { path: '', component: InicioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(router: Router, viewportScroller: ViewportScroller) {
    router.events.pipe(
      filter((e): e is Scroll => e instanceof Scroll)
    ).subscribe(e => {
      if (e.position) {
        viewportScroller.scrollToPosition(e.position);
      } else if (e.anchor) {
      } else {
        viewportScroller.scrollToPosition([0, 0]);
      }
    });
  }
}


