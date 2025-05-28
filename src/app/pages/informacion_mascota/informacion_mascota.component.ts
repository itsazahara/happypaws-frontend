import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MascotaService } from '../../services/mascota.service';
import { Mascota } from '../../models/mascota';
import { ReservaService } from '../../services/reserva.service';
import { ReservaDto } from '../../models/reserva-dto';
import { Cliente } from '../../models/cliente'; // Ajusta la ruta a tu modelo de Cliente
import { Administrador } from '../../models/administrador'; // Ajusta la ruta a tu modelo de Administrador
import { Estado } from '../../models/estado';
import { AuthService } from '../../services/auth.service';
import { ClienteService } from '../../services/cliente.service';
import { MascotaDto } from '../../models/mascota-dto';
import { ClienteDTO } from '../../models/cliente-dto';
import { AdministradorDto } from '../../models/administrador-dto';
import { ReservaRequestDto } from '../../models/reserva-request-dto';

@Component({
  selector: 'app-informacion-mascota',
  standalone: false,
  templateUrl: './informacion_mascota.component.html',
  styleUrls: ['./informacion_mascota.component.scss']
})
export class InformacionMascotaComponent implements OnInit {
  mascota!: MascotaDto;
  cliente!: ClienteDTO;
  administrador!: AdministradorDto;
  estado!: Estado;

  mostrarModalObservacion: boolean = false;
  observaciones: string = '';

  mostrarAlerta: boolean = false;
  mensajeAlerta: string = '';
  tipoAlerta: 'exito' | 'error' = 'exito';

  constructor(
    private route: ActivatedRoute,
    private mascotaService: MascotaService,
    private reservaService: ReservaService,
    private authService: AuthService,
    private clienteService: ClienteService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.mascotaService.getMascotaPorId(+id).subscribe((data: Mascota) => {
        if (data.id === undefined) {
          console.error('La mascota recibida no tiene id definido!');
          return;
        }
        this.mascota = data as MascotaDto;
      });
    }

    const email = this.authService.getClienteEmailFromToken();
    if (email) {
      this.clienteService.obtenerClientePorEmail(email).subscribe(cliente => {
        this.cliente = cliente;
      }, error => {
        console.error('Error al obtener cliente por email:', error);
      });
    } else {
      console.warn('No se encontró email en token');
    }
  }

  reservarMascota(): void {
    if (this.mascota && this.cliente && this.cliente.id) {
      this.mostrarModalObservacion = true; // mostrar modal personalizado
    } else {
      this.tipoAlerta = 'error';
      this.mensajeAlerta = 'No se pudo reservar: falta información del cliente o mascota.';
      this.mostrarAlerta = true;
      setTimeout(() => this.mostrarAlerta = false, 3000);
    }
  }

  confirmarReserva(): void {
    if (this.observaciones.trim() === '') {
      this.tipoAlerta = 'error';
      this.mensajeAlerta = 'Debes ingresar una observación.';
      this.mostrarAlerta = true;
      setTimeout(() => this.mostrarAlerta = false, 3000);
      return;
    }

    const reservaRequest: ReservaRequestDto = {
      id: 0,
      idMascota: this.mascota.id,
      idCliente: this.cliente.id,
      idAdministrador: 1,
      estado: Estado.PENDIENTE,
      observaciones: this.observaciones.trim()
    };

    this.reservaService.crearReserva(reservaRequest).subscribe({
      next: (reservaCreada) => {
        this.tipoAlerta = 'exito';
        this.mensajeAlerta = `La reserva ha sido realizada con éxito.`;
        this.mostrarAlerta = true;
        this.mostrarModalObservacion = false;
        this.observaciones = '';
        setTimeout(() => this.mostrarAlerta = false, 3000);
      },
      error: () => {
        this.tipoAlerta = 'error';
        this.mensajeAlerta = 'No se pudo realizar la reserva.';
        this.mostrarAlerta = true;
        this.mostrarModalObservacion = false;
        setTimeout(() => this.mostrarAlerta = false, 3000);
      }
    });
  }

  cancelarReserva(): void {
    this.mostrarModalObservacion = false;
    this.observaciones = '';
  }


}
