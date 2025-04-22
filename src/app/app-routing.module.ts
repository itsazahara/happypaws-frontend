import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: 'razas', component: RazaComponent },
  { path: 'reservas', component: ReservaComponent },
  { path: 'clientes', component: ClienteComponent },
  { path: 'admin', component: AdministradorComponent },
  { path: 'mascotas', component: MascotaComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
