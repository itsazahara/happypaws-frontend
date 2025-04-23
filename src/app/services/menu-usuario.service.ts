import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Asegúrate de importar HttpClient
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuUsuarioService {
  // URL de tu API de Spring Boot
  private apiUrl = 'http://localhost:8080/happypaws/api/mascotas'; // Cambia esto según tu API

  constructor(private http: HttpClient) {}

  // Método para obtener las mascotas desde la API
  obtenerMascotas(): Observable<any> {
    return this.http.get<any>(this.apiUrl);  // Realiza una solicitud GET a la API
  }
}
