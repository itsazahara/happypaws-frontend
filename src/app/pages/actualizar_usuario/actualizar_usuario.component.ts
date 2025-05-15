import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuUsuarioService } from '../../services/menu-usuario.service';
import { AuthService } from '../../services/auth.service';
import { ClienteDTO } from '../../models/cliente-dto';
import { Mascota } from '../../models/mascota';
import { TipoVivienda } from '../../models/tipo-vivienda';

@Component({
  selector: 'app-actualizar-usuario',
  standalone: false,
  templateUrl: './actualizar_usuario.component.html',
  styleUrls: ['./actualizar_usuario.component.scss']
})
export class ActualizarUsuarioComponent implements OnInit {
  cliente: ClienteDTO = {
    id: 0,
    nombre: '',
    apellidos: '',
    usuario: '',
    telefono: '',
    email: '',
    direccion: '',
    edad: 0,
    ocupacionLaboral: '',
    tipoVivienda: TipoVivienda.PISO,  // Valor por defecto del enum
    otrasMascotas: false,
    experienciaMascotas: false,
    observaciones: '',
    imagen: ''
  };

  mascotas: Mascota[] = [];
  modoEditar: boolean = false;
  cargando: boolean = true;
  objectKeys = Object.keys;
  tiposVivienda = TipoVivienda;
  tipoViviendaKeys: (keyof typeof TipoVivienda)[] = Object.keys(TipoVivienda) as (keyof typeof TipoVivienda)[];

  constructor(
    private menuUsuarioService: MenuUsuarioService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const cliente = this.authService.getClienteActual(); // Aquí devuelve string o null

    if (cliente) {
      // Llamar al backend para traer ClienteDTO con ese email
      this.menuUsuarioService.obtenerClientePorId(cliente.id).subscribe({
        next: (clienteDTO) => {
          this.cliente = clienteDTO;
          this.cargando = false;
        },
        error: (err) => {
          console.error('Error al obtener cliente:', err);
          this.cargando = false;
        }
      });
    } else {
      console.error('Cliente no encontrado en las cookies');
      this.cargando = false;
    }

    // Cargar mascotas (igual que antes)
    this.menuUsuarioService.obtenerMascotas().subscribe({
      next: (mascotas) => this.mascotas = mascotas,
      error: (err) => console.error('Error al obtener mascotas:', err)
    });
  }

  actualizarCliente(): void {
    // Aquí enviarías los datos actualizados al backend
    console.log("Cliente actualizado", this.cliente);
    // Podrías llamar a un servicio para actualizar los datos del cliente
  }

  verReservas(): void {
    console.log('Ver reservas del cliente', this.cliente.id);
  }
}
