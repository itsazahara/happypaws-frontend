import { Mascota } from "./mascota";

export interface RazaDto {

  id: number;
  nombre: string;
  mascotas?: Mascota[];

}
