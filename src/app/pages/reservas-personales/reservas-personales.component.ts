import { Component, OnInit } from '@angular/core';
import { Reserva } from '../../models/reserva';
import { AuthService } from '../../services/auth.service';
import { ReservaService } from '../../services/reserva.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Estado } from '../../models/estado';

@Component({
  selector: 'app-reservas-personales',
  standalone: false,
  templateUrl: './reservas-personales.component.html',
  styleUrls: ['./reservas-personales.component.scss']  // corregido
})
export class ReservasPersonalesComponent implements OnInit {

  reservas: Reserva[] = [];
  cargando: boolean = true;
  estadoSeleccionado = 'TODOS';
  estadoKeys = Object.keys(Estado);
  reservasFiltradas: Reserva[] = [];

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private reservaService: ReservaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.getReservasPorClienteId(+id);
    }
  }

  getReservasPorClienteId(clienteId: number): void {
    this.cargando = true;
    this.reservaService.getReservasPorClienteId(clienteId).subscribe({
      next: (res) => {
        this.reservas = res;
        this.filtrarPorEstado();
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al obtener reservas:', err);
        this.cargando = false;
      }
    });
  }

  filtrarPorEstado(): void {
    if (this.estadoSeleccionado === 'TODOS') {
      this.reservasFiltradas = this.reservas;
    } else {
      this.reservasFiltradas = this.reservas.filter(r => r.estado === this.estadoSeleccionado);
    }
  }

  cancelarReserva(id: number): void {
    if (confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
      this.reservaService.actualizarEstado(id, Estado.CANCELADA).subscribe({
        next: (reservaActualizada: Partial<Reserva>) => {
          const index = this.reservas.findIndex(r => r.id === reservaActualizada.id);
          if (index !== -1) {
            this.reservas[index] = {
              ...this.reservas[index],
              ...reservaActualizada
            };
            this.filtrarPorEstado();
          }
        },
        error: (err) => {
          console.error('Error al cancelar reserva:', err);
        }
      });
    }
  }

  verDetalles(mascotaId: number): void {
    this.router.navigate(['/adoptar_mascota', mascotaId]);
  }
}
