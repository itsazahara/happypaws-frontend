import { Component } from '@angular/core';
import { ReservaDto } from '../../models/reserva-dto';
import { ActivatedRoute } from '@angular/router';
import { ReservaService } from '../../services/reserva.service';

@Component({
  selector: 'app-detalles-reserva',
  standalone: false,
  templateUrl: './detalles-reserva.component.html',
  styleUrl: './detalles-reserva.component.scss'
})
export class DetallesReservaComponent {

  reserva: ReservaDto | null = null;

  constructor(private route: ActivatedRoute, private reservaService: ReservaService) { }

  ngOnInit(): void {
    const reservaId = Number(this.route.snapshot.paramMap.get('id'));
    this.reservaService.obtenerReservaPorId(reservaId).subscribe({
      next: (data) => this.reserva = data,
      error: (err) => console.error('Error al cargar detalles de reserva', err)
    });
  }
}
