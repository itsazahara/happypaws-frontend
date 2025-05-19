import { Component, OnInit } from '@angular/core';
import { ReservaDto } from '../../models/reserva-dto';
import { ReservaService } from '../../services/reserva.service';
import { Estado } from '../../models/estado';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-reservas',
  standalone: false,
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.scss'
})
export class ReservasComponent implements OnInit {

  reservas: ReservaDto[] = [];
  cargando = true;
  EstadoReserva = Estado;
  estadoSeleccionado: string = 'TODOS';
  estadoKeys = Object.keys(Estado);
  ordenFecha: 'asc' | 'desc' = 'desc';

  constructor(private reservaService: ReservaService, private cookieService: CookieService) { }

  ngOnInit(): void {
    const token = this.cookieService.get('token');
    console.log('Token leído desde cookie:', token);

    this.reservaService.obtenerReservas().subscribe({
      next: (data) => {
        this.reservas = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar reservas', err);
        this.cargando = false;
      }
    });
  }

  filtrarPorEstado(): void {
    this.cargando = true;

    if (this.estadoSeleccionado === 'TODOS') {
      this.reservaService.obtenerReservas().subscribe({
        next: (data) => {
          this.reservas = data;
          this.cargando = false;
        },
        error: (err) => {
          console.error('Error al cargar reservas', err);
          this.cargando = false;
        }
      });
    } else {
      this.reservaService.obtenerReservasPorEstado(this.estadoSeleccionado).subscribe({
        next: (data) => {
          this.reservas = data;
          this.cargando = false;
        },
        error: (err) => {
          console.error('Error al filtrar reservas', err);
          this.cargando = false;
        }
      });
    }
  }

  cambiarEstado(reservaId: number, nuevoEstado: Estado): void {
    this.reservaService.actualizarEstado(reservaId, nuevoEstado).subscribe({
      next: updatedReserva => {
        const index = this.reservas.findIndex(r => r.id === updatedReserva.id);
        if (index !== -1) {
          this.reservas[index] = updatedReserva;
        }
      },
      error: err => console.error('Error al actualizar estado', err)
    });
  }



}
