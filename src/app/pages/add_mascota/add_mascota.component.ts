import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Raza } from '../../models/raza';
import { Mascota } from '../../models/mascota';
import { Sexo } from '../../models/sexo';
import { Especie } from '../../models/especie';
import { Tamanio } from '../../models/tamanio';
import { Router} from '@angular/router';

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

  constructor(private http: HttpClient, private router: Router) {
    // Cargar razas disponibles para el campo de raza
    this.http.get<Raza[]>('http://localhost:8080/happypaws/api/razas')
      .subscribe(razas => {
        this.razas = razas;
      });
  }

  guardarMascota() {
    this.http.post('http://localhost:8080/happypaws/api/mascotas', this.mascota)
      .subscribe({
        next: (response) => {
          alert('Mascota guardada con éxito');
          this.router.navigate(['/menu_administrador']);
        },
        error: (error) => {
          alert('Error al guardar la mascota');
          console.error('Error:', error);
        }
      });
  }


  // Métodos para manejar la carga de archivos
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
}
