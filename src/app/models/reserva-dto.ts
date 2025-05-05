import { Administrador } from "./administrador";
import { Cliente } from "./cliente";
import { Estado } from "./estado";
import { Mascota } from "./mascota";

export interface ReservaDto {
  id: number;
  mascotas: Mascota;
  clientes: Cliente;
  administradores: Administrador;
  estado: Estado;
  observaciones: string;
  fechaSolicitud: string;
}
