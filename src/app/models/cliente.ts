import { TipoVivienda } from './tipo-vivienda';
import { Reserva } from './reserva';

export interface Cliente {
  id?: number;
  nombre: string;
  apellidos: string;
  usuario: string;
  contrasenia?: string;  // Opcional ya que en el backend es nullable
  email: string;
  direccion: string;
  edad: number;
  telefono: string;
  ocupacionLaboral: string;
  tipoVivienda: TipoVivienda;
  otrasMascotas: boolean;
  experienciaMascotas: boolean;
  observaciones: string;
  imagen: string;
  reservas?: Reserva[];  // Opcional, solo si necesitas traerlas desde el backend
}
