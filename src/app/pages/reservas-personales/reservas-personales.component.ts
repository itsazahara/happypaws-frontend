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

  mostrarAlerta: boolean = false;
  mensajeAlerta: string = '';
  tipoAlerta: 'exito' | 'error' = 'exito';
  mostrarConfirmacion: boolean = false;
  reservaPendienteCancelar: number | null = null;

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

  confirmarCancelacion(id: number): void {
    this.reservaPendienteCancelar = id;
    this.mostrarConfirmacion = true;
  }

  cancelarReservaConfirmada(): void {
    if (this.reservaPendienteCancelar !== null) {
      this.reservaService.actualizarEstado(this.reservaPendienteCancelar, Estado.CANCELADA).subscribe({
        next: (reservaActualizada: Partial<Reserva>) => {
          const index = this.reservas.findIndex(r => r.id === reservaActualizada.id);
          if (index !== -1) {
            this.reservas[index] = {
              ...this.reservas[index],
              ...reservaActualizada
            };
            this.filtrarPorEstado();
          }

          this.tipoAlerta = 'exito';
          this.mensajeAlerta = 'Reserva cancelada correctamente.';
          this.mostrarAlerta = true;
          this.mostrarConfirmacion = false;

          setTimeout(() => this.mostrarAlerta = false, 3000);
        },
        error: () => {
          this.tipoAlerta = 'error';
          this.mensajeAlerta = 'Error al cancelar la reserva.';
          this.mostrarAlerta = true;
          this.mostrarConfirmacion = false;

          setTimeout(() => this.mostrarAlerta = false, 3000);
        }
      });
    }
  }

  cancelarConfirmacion(): void {
    this.reservaPendienteCancelar = null;
    this.mostrarConfirmacion = false;
  }


  verDetalles(mascotaId: number): void {
    this.router.navigate(['/adoptar_mascota', mascotaId]);
  }

}
