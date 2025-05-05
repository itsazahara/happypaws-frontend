import { Estado } from "./estado";

export interface ReservaRequestDto {
  id: number;
  idMascota: number;
  idCliente: number;
  idAdministrador: number;
  estado: Estado;
  observaciones?: string; // Es opcional si puede venir nulo desde el backend
}
