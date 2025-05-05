import { TipoVivienda } from './tipo-vivienda';

export interface ClienteDTO {
  id: number;
  nombre: string;
  apellidos: string;
  usuario: string;
  telefono: string;
  email: string;
  direccion: string;
  edad: number;
  ocupacionLaboral: string;
  tipoVivienda: TipoVivienda;
  otrasMascotas: boolean;
  experienciaMascotas: boolean;
  observaciones: string;
  imagen: string;

}
