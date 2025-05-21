import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Mascota } from '../../models/mascota';

@Component({
  selector: 'app-mascotas',
  standalone: false,
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.scss']
})
export class MascotasComponent implements OnInit {
  especieFiltrada: string | null = null;
  mascotas: Mascota[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.especieFiltrada = params['especie'];
      this.especieFiltrada ? this.cargarMascotasFiltradas() : this.cargarTodasLasMascotas();
    });
  }

  cargarMascotasFiltradas(): void {
    this.http.get<Mascota[]>(`http://localhost:8080/happypaws/api/mascotas/buscarPorEspecie?especie=${this.especieFiltrada}`).subscribe(
      (response) => this.mascotas = response,
      (error) => console.error('Error al obtener las mascotas:', error)
    );
  }

  cargarTodasLasMascotas(): void {
    this.http.get<Mascota[]>('http://localhost:8080/happypaws/api/mascotas').subscribe(
      (response) => this.mascotas = response,
      (error) => console.error('Error al obtener las mascotas:', error)
    );
  }

  eliminarMascota(id: number): void {
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar esta mascota?');

    if (confirmacion) {
      this.http.delete(`http://localhost:8080/happypaws/api/mascotas/${id}`).subscribe(
        () => {
          this.mascotas = this.mascotas.filter(m => m.id !== id);
          alert('Mascota eliminada exitosamente.');
        },
        (error) => {
          console.error('Error al eliminar la mascota:', error);
          alert('Error al eliminar la mascota.');
        }
      );
    }
  }

}
