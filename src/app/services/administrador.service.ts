import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdministradorDto } from '../models/administrador-dto';
import { Observable } from 'rxjs';
import { Administrador } from '../models/administrador';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  private apiUrl = 'http://localhost:8080/happypaws/api/administradores';

  constructor(private http: HttpClient) { }

  obtenerAdministradores(): Observable<AdministradorDto[]> {
    return this.http.get<AdministradorDto[]>(this.apiUrl);
  }

  obtenerAdministradorPorId(id: number): Observable<AdministradorDto> {
    return this.http.get<AdministradorDto>(`${this.apiUrl}/${id}`);
  }

  crearAdministrador(administrador: Administrador): Observable<AdministradorDto> {
    return this.http.post<AdministradorDto>(this.apiUrl, administrador);
  }

  actualizarAdministrador(id: number, administradorDTO: AdministradorDto): Observable<AdministradorDto> {
    return this.http.put<AdministradorDto>(`${this.apiUrl}/${id}`, administradorDTO);
  }

  eliminarAdministrador(id: number): Observable<AdministradorDto> {
    return this.http.delete<AdministradorDto>(`${this.apiUrl}/${id}`);
  }

  obtenerAdminPorEmail(email: string): Observable<AdministradorDto> {
    return this.http.get<AdministradorDto>(`http://localhost:8080/happypaws/api/administradores/email/${email}`);
  }
}
