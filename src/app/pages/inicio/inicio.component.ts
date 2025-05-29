import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: false,
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent {

  constructor(private router: Router) { }

  verMascotasPorEspecie(especie: string): void {
    this.router.navigate(['/mascotas'], { queryParams: { especie: especie } });
  }

}
