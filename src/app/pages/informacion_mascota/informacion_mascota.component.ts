import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MascotaService } from '../../services/mascota.service';
import { Mascota } from '../../models/mascota';
import { ReservaService } from '../../services/reserva.service';
import { ReservaDto } from '../../models/reserva-dto';
import { Cliente } from '../../models/cliente'; // Ajusta la ruta a tu modelo de Cliente
import { Administrador } from '../../models/administrador'; // Ajusta la ruta a tu modelo de Administrador
import { Estado } from '../../models/estado';

@Component({
  selector: 'app-informacion-mascota',
  standalone: false,
  templateUrl: './informacion_mascota.component.html',
  styleUrls: ['./informacion_mascota.component.scss']
})
export class InformacionMascotaComponent implements OnInit {
  mascota!: Mascota;
  cliente!: Cliente;
  administrador!: Administrador;
  estado!: Estado;

  constructor(
    private route: ActivatedRoute,
    private mascotaService: MascotaService,
    private reservaService: ReservaService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.mascotaService.getMascotaPorId(+id).subscribe((data: Mascota) => {
        this.mascota = data;
      });
    }
  }

  reservarMascota(): void {
    if (this.mascota) {
      // Suponemos que el cliente y administrador están disponibles (estos datos pueden venir de otro lugar, como un login)
      const nuevaReserva: ReservaDto = {
        id: 0, // Esto lo asigna tu backend automáticamente
        mascotas: this.mascota,
        clientes: this.cliente,
        administradores: this.administrador,
        estado: this.estado,
        observaciones: 'Solicitud realizada desde la ficha de mascota.',
        fechaSolicitud: new Date().toISOString()
      };

      this.reservaService.crearReserva(nuevaReserva).subscribe({
        next: (reserva) => {
          alert(`Reserva realizada con éxito. ID de reserva: ${reserva.id}`);
        },
        error: (error) => {
          console.error('Error al reservar mascota:', error);
          alert('No se pudo realizar la reserva.');
        }
      });
    }
  }
}
