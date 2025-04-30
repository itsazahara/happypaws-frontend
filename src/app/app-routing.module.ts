import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MenuUsuarioComponent } from './pages/menu_usuario/menu_usuario.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ActualizarUsuarioComponent } from './pages/actualizar_usuario/actualizar_usuario.component';
import { RazaComponent } from './pages/raza/raza.component';
import { MascotasPorRazaComponent } from './pages/mascotas-por-raza/mascotas-por-raza.component';
import { MenuAdministradorComponent } from './pages/menu_administrador/menu_administrador.component';
import { AddMascotaComponent } from './pages/add_mascota/add_mascota.component';



const routes: Routes = [
  { path: 'menu_usuario', component: MenuUsuarioComponent},
  { path: 'actualizar_usuario', component: ActualizarUsuarioComponent},
  { path: 'login', component: LoginComponent },
  { path: 'raza', component: RazaComponent },
  { path: 'mascotas-por-raza/:id', component: MascotasPorRazaComponent },
  { path: 'menu_administrador', component: MenuAdministradorComponent},
  { path: 'add_mascota', component: AddMascotaComponent},
  { path: '', component: InicioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
