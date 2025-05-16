import { Component, OnInit } from '@angular/core';
import { ReservaDto } from '../../models/reserva-dto';
import { ReservaService } from '../../services/reserva.service';
import { Estado } from '../../models/estado';

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

  constructor(private reservaService: ReservaService) { }

  ngOnInit(): void {
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

  cambiarEstado(reservaId: number, nuevoEstado: Estado): void {
    this.reservaService.actualizarEstado(reservaId, nuevoEstado).subscribe({
      next: (reservaActualizada) => {
        const i = this.reservas.findIndex(r => r.id === reservaActualizada.id);
        if (i !== -1) this.reservas[i] = reservaActualizada;
      },
      error: err => console.error('Error al cambiar estado', err)
    });
  }

}
