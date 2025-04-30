import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Raza } from '../../models/raza';

@Component({
  selector: 'app-add_mascota',
  standalone: false,
  templateUrl: './add_mascota.component.html',
  styleUrls: ['./add_mascota.component.scss']
})
export class AddMascotaComponent {

  mascota = {
    nombre: '',
    sexo: 'Macho',
    especie: 'Perro',
    tamanio: 'Pequeño',
    edad: 1,
    peso: 1.0,
    esterilizado: false,
    vacunado: false,
    desparasitado: false,
    personalidad: '',
    imagen: '',
    cuidados_especiales: '',
    historia: '',
    disponibilidad: true,
    id_raza: 1
  };

  razas: Raza[] = [];

  constructor(private http: HttpClient) {
    // Cargar razas disponibles para el campo de raza
    this.http.get<Raza[]>('http://localhost:8080/happypaws/api/razas')
      .subscribe(razas => {
        this.razas = razas;
      });
  }

  guardarMascota() {
    // Aquí enviarás los datos a tu API
    this.http.post('http://localhost:8080/happypaws/api/mascotas', this.mascota)
      .subscribe(response => {
        console.log('Mascota guardada', response);
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
