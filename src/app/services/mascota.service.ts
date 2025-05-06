import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mascota } from '../models/mascota';


@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  private apiUrl = 'http://localhost:8080/happypaws/api/mascotas'; // URL de tu API

  constructor(private http: HttpClient) { }

  // Método para obtener las mascotas desde la API
  getMascotas(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getMascotaPorId(id: number): Observable<Mascota> {
    return this.http.get<Mascota>(`${this.apiUrl}/${id}`);
  }

}
