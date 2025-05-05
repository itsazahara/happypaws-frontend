import { Component, OnInit } from '@angular/core';
import { MenuUsuarioService } from '../../services/menu-usuario.service';
import { Mascota } from '../../models/mascota';

@Component({
  selector: 'app-menu-usuario',
  standalone: false,
  templateUrl: './menu_usuario.component.html',
  styleUrls: ['./menu_usuario.component.scss']
})
export class MenuUsuarioComponent implements OnInit {
  // Propiedades para almacenar las mascotas y el filtro
  mascotas: Mascota[] = [];
  mascotasFiltradas: Mascota[] = [];
  filtro = {
    tipo: '',
    edad: null,
    sexo: '',
    tamanio: '',
    vacunado: null,
    esterilizado: null,
    desparasitado: null
  };

  constructor(private menuUsuarioService: MenuUsuarioService) { }

  ngOnInit(): void {
    // Obtener las mascotas al cargar el componente
    this.menuUsuarioService.obtenerMascotas().subscribe((mascotas) => {
      this.mascotas = mascotas;
      this.filtrarMascotas();  // Llamar a filtrar las mascotas después de obtenerlas
    });
  }

  // Filtrar mascotas en base al filtro aplicado
  filtrarMascotas(): void {
    this.mascotasFiltradas = this.mascotas.filter((mascota) => {
      let tipoCoincide = true;
      let edadCoincide = true;
      let sexoCoincide = true;
      let tamanioCoincide = true;
      let vacunadoCoincide = true;
      let esterilizadoCoincide = true;
      let desparasitadoCoincide = true;

      // Filtrar por tipo
      if (this.filtro.tipo) {
        tipoCoincide = mascota.especie.toLowerCase() === this.filtro.tipo.toLowerCase();
      }

      // Filtrar por edad
      if (this.filtro.edad !== null) {
        edadCoincide = mascota.edad <= this.filtro.edad;
      }

      // Filtrar por sexo
      if (this.filtro.sexo) {
        sexoCoincide = mascota.sexo.toLowerCase() === this.filtro.sexo.toLowerCase();
      }

      // Filtrar por tamaño
      if (this.filtro.tamanio) {
        tamanioCoincide = mascota.tamanio.toLowerCase() === this.filtro.tamanio.toLowerCase();
      }

      // Filtrar por vacunado
      if (this.filtro.vacunado !== null) {
        vacunadoCoincide = mascota.vacunado === this.filtro.vacunado;
      }

      // Filtrar por esterilizado
      if (this.filtro.esterilizado !== null) {
        esterilizadoCoincide = mascota.esterilizado === this.filtro.esterilizado;
      }

      // Filtrar por desparasitado
      if (this.filtro.desparasitado !== null) {
        desparasitadoCoincide = mascota.desparasitado === this.filtro.desparasitado;
      }

      return tipoCoincide && edadCoincide && sexoCoincide && tamanioCoincide && vacunadoCoincide && esterilizadoCoincide && desparasitadoCoincide;
    });
  }

  // Llamar a esta función cada vez que se cambie un filtro
  aplicarFiltros(): void {
    this.filtrarMascotas();
  }
}
