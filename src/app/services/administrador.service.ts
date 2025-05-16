import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdministradorDto } from '../models/administrador-dto';
import { Observable } from 'rxjs';
import { Administrador } from '../models/administrador';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  private apiUrl = 'http://localhost:8080/happypaws/api/administradores';  // URL base del controlador Spring

  constructor(private http: HttpClient) { }

  // Obtener todos los administradores
  obtenerAdministradores(): Observable<AdministradorDto[]> {
    return this.http.get<AdministradorDto[]>(this.apiUrl);
  }

  // Obtener administrador por ID
  obtenerAdministradorPorId(id: number): Observable<AdministradorDto> {
    return this.http.get<AdministradorDto>(`${this.apiUrl}/${id}`);
  }

  // Crear nuevo administrador
  crearAdministrador(administrador: Administrador): Observable<AdministradorDto> {
    return this.http.post<AdministradorDto>(this.apiUrl, administrador);
  }

  // Actualizar administrador existente
  actualizarAdministrador(id: number, administradorDTO: AdministradorDto): Observable<AdministradorDto> {
    return this.http.put<AdministradorDto>(`${this.apiUrl}/${id}`, administradorDTO);
  }

  // Eliminar administrador por ID
  eliminarAdministrador(id: number): Observable<AdministradorDto> {
    return this.http.delete<AdministradorDto>(`${this.apiUrl}/${id}`);
  }

  obtenerAdminPorEmail(email: string): Observable<AdministradorDto> {
    return this.http.get<AdministradorDto>(`http://localhost:8080/happypaws/api/administradores/email/${email}`);
  }
}
