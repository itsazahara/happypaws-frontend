import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu-administrador',
  standalone: false,
  templateUrl: './menu_administrador.component.html',
  styleUrls: ['./menu_administrador.component.scss']
})
export class MenuAdministradorComponent {

  constructor(private router: Router) {}

  verMascotasPorEspecie(especie: string): void {
    this.router.navigate(['/mascotas'], { queryParams: { especie: especie } });
  }

}
