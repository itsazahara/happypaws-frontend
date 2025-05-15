import { Component, OnInit } from '@angular/core';
import { MenuUsuarioService } from '../../services/menu-usuario.service';
import { Mascota } from '../../models/mascota';
import { AuthService } from '../../services/auth.service';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente';



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
  tooltipMascota: Mascota | null = null;
  cliente?: Cliente;

  constructor(private menuUsuarioService: MenuUsuarioService, private authService: AuthService, private clienteService: ClienteService) { }

  ngOnInit(): void {
    // Obtener las mascotas al cargar el componente
    this.menuUsuarioService.obtenerMascotas().subscribe((mascotas) => {
      this.mascotas = mascotas.map(mascota => ({
        ...mascota,
        imagen: mascota.imagen  // Asegúrate de que este campo esté en la respuesta de la base de datos
      }));
      this.filtrarMascotas();  // Llamar a filtrar las mascotas después de obtenerlas
    });
    if (this.authService.isLoggedIn()) {
      const decoded = this.authService.getDecodedToken();
      if (decoded?.id) {
        this.clienteService.getClientePorId(decoded.id).subscribe({
          next: (cli) => this.cliente = cli,
          error: (err) => console.error('Error al cargar cliente', err)
        });
      }
    }
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
      if (this.filtro.vacunado !== null && this.filtro.vacunado !== '') {
        const vacunadoBool = this.filtro.vacunado === 'true';
        vacunadoCoincide = mascota.vacunado === vacunadoBool;
      }

      // Filtrar por esterilizado
      if (this.filtro.esterilizado !== null && this.filtro.esterilizado !== '') {
        const esterilizadoBool = this.filtro.esterilizado === 'true';
        esterilizadoCoincide = mascota.esterilizado === esterilizadoBool;
      }

      // Filtrar por desparasitado
      if (this.filtro.desparasitado !== null && this.filtro.desparasitado !== '') {
        const desparasitadoBool = this.filtro.desparasitado === 'true';
        desparasitadoCoincide = mascota.desparasitado === desparasitadoBool;
      }

      return tipoCoincide && edadCoincide && sexoCoincide && tamanioCoincide && vacunadoCoincide && esterilizadoCoincide && desparasitadoCoincide;
    });
  }

  // Llamar a esta función cada vez que se cambie un filtro
  aplicarFiltros(): void {
    this.filtrarMascotas();
  }

  limpiarFiltros(): void {
    this.filtro = {
      tipo: '',
      edad: null,
      sexo: '',
      tamanio: '',
      vacunado: null,
      esterilizado: null,
      desparasitado: null
    };
    this.filtrarMascotas(); // Mostrar todas las mascotas
  }



}
