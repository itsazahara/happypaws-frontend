import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Raza } from '../../models/raza';
import { Mascota } from '../../models/mascota';
import { Sexo } from '../../models/sexo';
import { Especie } from '../../models/especie';
import { Tamanio } from '../../models/tamanio';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add_mascota',
  standalone: false,
  templateUrl: './add_mascota.component.html',
  styleUrls: ['./add_mascota.component.scss']
})
export class AddMascotaComponent {

  mascota: Mascota = {
    nombre: '',
    sexo: Sexo.MACHO,
    especie: Especie.PERRO,
    tamanio: Tamanio.PEQUEÑO,
    edad: 0,
    peso: 0.0,
    esterilizado: false,
    vacunado: false,
    desparasitado: false,
    personalidad: '',
    imagen: '',
    cuidadosEspeciales: '',
    historia: '',
    disponibilidad: true,
    idRaza: 1
  };

  razas: Raza[] = [];
  mostrarAlerta: boolean = false;
  mensajeAlerta: string = '';
  tipoAlerta: 'exito' | 'error' = 'exito';

  constructor(private http: HttpClient, private router: Router) {
    this.http.get<Raza[]>('http://localhost:8080/happypaws/api/razas')
      .subscribe(razas => {
        this.razas = razas;
      });
  }

  guardarMascota() {
    const camposObligatorios = [
      this.mascota.nombre,
      this.mascota.sexo,
      this.mascota.especie,
      this.mascota.tamanio,
      this.mascota.edad,
      this.mascota.peso,
      this.mascota.esterilizado,
      this.mascota.vacunado,
      this.mascota.desparasitado,
      this.mascota.imagen,
      this.mascota.cuidadosEspeciales,
      this.mascota.personalidad,
      this.mascota.historia,
      this.mascota.idRaza
    ];

    const camposVacios = camposObligatorios.some(campo => campo === null || campo === undefined || campo === '' || campo === 0);

    if (camposVacios) {
      this.tipoAlerta = 'error';
      this.mensajeAlerta = 'Por favor completa todos los campos obligatorios.';
      this.mostrarAlerta = true;

      setTimeout(() => {
        this.mostrarAlerta = false;
      }, 3000);
      return;
    }

    this.http.post('http://localhost:8080/happypaws/api/mascotas', this.mascota)
      .subscribe({
        next: () => {
          this.tipoAlerta = 'exito';
          this.mensajeAlerta = '¡Nueva mascota añadida!';
          this.mostrarAlerta = true;

          setTimeout(() => {
            this.mostrarAlerta = false;
            this.router.navigate(['/menu_administrador']);
          }, 2350);
        },
        error: () => {
          this.tipoAlerta = 'error';
          this.mensajeAlerta = 'Los datos introducidos no son válidos.';
          this.mostrarAlerta = true;

          setTimeout(() => {
            this.mostrarAlerta = false;
          }, 3000);
        }
      });
  }

  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.mascota.imagen = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        this.mascota.imagen = reader.result as string;
      };
      reader.readAsDataURL(files[0]);
    }
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.mascota.imagen = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
