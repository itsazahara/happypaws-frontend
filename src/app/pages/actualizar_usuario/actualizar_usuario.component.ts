import { Component, OnInit } from '@angular/core';
import { MenuUsuarioService } from '../../services/menu-usuario.service';
import { AuthService } from '../../services/auth.service';
import { ClienteDTO } from '../../models/cliente-dto';
import { Mascota } from '../../models/mascota';
import { TipoVivienda } from '../../models/tipo-vivienda';
import { ClienteService } from '../../services/cliente.service';
import { Router } from '@angular/router';

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
    tipoVivienda: TipoVivienda.PISO,
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

  mostrarAlerta: boolean = false;
  mensajeAlerta: string = '';
  tipoAlerta: 'exito' | 'error' = 'exito';

  constructor(
    private menuUsuarioService: MenuUsuarioService,
    private authService: AuthService,
    private clienteService: ClienteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const email = this.authService.getClienteEmailFromToken();

    if (email) {
      this.clienteService.obtenerClientePorEmail(email).subscribe({
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
      console.error('No se pudo obtener el email del token');
      this.cargando = false;
    }

    this.menuUsuarioService.obtenerMascotas().subscribe({
      next: (mascotas) => this.mascotas = mascotas,
      error: (err) => console.error('Error al obtener mascotas:', err)
    });
  }

  actualizarCliente(): void {
    this.clienteService.actualizarCliente(this.cliente.id, this.cliente).subscribe({
      next: (clienteActualizado) => {
        this.cliente = clienteActualizado;
        this.modoEditar = false;
        this.tipoAlerta = 'exito';
        this.mensajeAlerta = 'Los datos personales han sido actualizados correctamente.';
        this.mostrarAlerta = true;

        setTimeout(() => this.mostrarAlerta = false, 3000);
      },
      error: (err) => {
        this.tipoAlerta = 'error';
        this.mensajeAlerta = 'Se ha producido un error al actualizar los datos personales.';
        this.mostrarAlerta = true;

        setTimeout(() => this.mostrarAlerta = false, 3000);
      }
    });
  }

  verReservas(): void {
    this.router.navigate(['/reservas-personales', this.cliente.id]);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login-cliente']);
  }
}
