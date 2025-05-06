import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mascotas',
  standalone: false,
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.scss']
})
export class MascotasComponent implements OnInit {
  especieFiltrada: string | null = null;
  mascotas: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    // Obtener el parámetro de especie de la URL
    this.route.queryParams.subscribe(params => {
      this.especieFiltrada = params['especie'];

      if (this.especieFiltrada) {
        // Si se pasa un filtro de especie, obtenemos las mascotas de esa especie
        this.cargarMascotasFiltradas();
      } else {
        // Si no se pasa un filtro, obtener todas las mascotas
        this.cargarTodasLasMascotas();
      }
    });
  }

  cargarMascotasFiltradas(): void {
    // Realizamos la petición a la API para obtener las mascotas filtradas por especie
    this.http.get<any[]>(`http://localhost:8080/happypaws/api/mascotas/buscarPorEspecie?especie=${this.especieFiltrada}`).subscribe(
      (response) => {
        this.mascotas = response;
      },
      (error) => {
        console.error('Error al obtener las mascotas:', error);
      }
    );
  }

  cargarTodasLasMascotas(): void {
    // Realizamos la petición a la API para obtener todas las mascotas
    this.http.get<any[]>('http://localhost:8080/happypaws/api/mascotas').subscribe(
      (response) => {
        this.mascotas = response;
      },
      (error) => {
        console.error('Error al obtener las mascotas:', error);
      }
    );
  }
}
