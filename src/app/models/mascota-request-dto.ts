import { Especie } from "./especie";
import { Sexo } from "./sexo";
import { Tamanio } from "./tamanio";

export interface MascotaRequestDto {
  id?: number;
  nombre: string;
  sexo: Sexo;
  especie: Especie;
  tamanio: Tamanio;
  edad: number;
  peso: number;
  esterilizado: boolean;
  vacunado: boolean;
  desparasitado: boolean;
  personalidad: string;
  imagen: string;
  cuidadosEspeciales: string;
  historia: string;
  disponibilidad: boolean;
  idRaza?: number;
}
