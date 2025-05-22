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

  mostrarAlerta: boolean = false;
  mensajeAlerta: string = '';
  tipoAlerta: 'exito' | 'error' = 'exito';
  idMascotaPendienteEliminar: number | null = null;
  mostrarConfirmacion: boolean = false;


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

  // Llama esto cuando el usuario haga clic en el botón "Eliminar"
  confirmarEliminacion(id: number): void {
    this.idMascotaPendienteEliminar = id;
    this.mostrarConfirmacion = true;
  }

  // Llama esto si el usuario hace clic en "Aceptar"
  eliminarMascotaConfirmada(): void {
    if (this.idMascotaPendienteEliminar !== null) {
      this.http.delete(`http://localhost:8080/happypaws/api/mascotas/${this.idMascotaPendienteEliminar}`).subscribe({
        next: () => {
          this.mascotas = this.mascotas.filter(m => m.id !== this.idMascotaPendienteEliminar);
          this.tipoAlerta = 'exito';
          this.mensajeAlerta = 'Mascota eliminada exitosamente.';
          this.mostrarAlerta = true;
          this.mostrarConfirmacion = false;

          setTimeout(() => {
            this.mostrarAlerta = false;
          }, 3000);
        },
        error: () => {
          this.tipoAlerta = 'error';
          this.mensajeAlerta = 'Error al eliminar la mascota.';
          this.mostrarAlerta = true;
          this.mostrarConfirmacion = false;

          setTimeout(() => {
            this.mostrarAlerta = false;
          }, 3000);
        }
      });
    }
  }

  // Llama esto si el usuario hace clic en "Cancelar"
  cancelarEliminacion(): void {
    this.mostrarConfirmacion = false;
    this.idMascotaPendienteEliminar = null;
  }


}
