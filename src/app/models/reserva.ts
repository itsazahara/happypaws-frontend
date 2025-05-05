import { Estado } from './estado';
import { Cliente } from './cliente';
import { Mascota } from './mascota';
import { Administrador } from './administrador';

export interface Reserva {
  id: number;
  idMascota: number;
  mascota: Mascota;
  idCliente: number;
  cliente: Cliente;
  idAdministrador: number;
  administrador: Administrador;
  estado: Estado;
  observaciones?: string;
  fechaSolicitud: string;
}
