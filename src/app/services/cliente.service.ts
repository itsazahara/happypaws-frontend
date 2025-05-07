import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:8080/happypaws/api/clientes';

  constructor(private http: HttpClient) {}

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  getClientePorId(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }

  crearCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente);
  }

  actualizarCliente(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/${id}`, cliente);
  }

  eliminarCliente(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.apiUrl}/${id}`);
  }

  actualizarOtrasMascotas(id: number, otrasMascotas: boolean): Observable<Cliente> {
    const params = new HttpParams().set('otrasMascotas', otrasMascotas.toString());
    return this.http.put<Cliente>(`${this.apiUrl}/${id}/otras-mascotas`, null, { params });
  }

  actualizarExperienciaMascotas(id: number, experienciaMascotas: boolean): Observable<Cliente> {
    const params = new HttpParams().set('experienciaMascotas', experienciaMascotas.toString());
    return this.http.put<Cliente>(`${this.apiUrl}/${id}/experiencia-mascotas`, null, { params });
  }

  login(emailOrUsuario: string, contrasenia: string): Observable<Cliente> {
    const body = {
      email: emailOrUsuario.includes('@') ? emailOrUsuario : null,
      usuario: !emailOrUsuario.includes('@') ? emailOrUsuario : null,
      contrasenia: contrasenia
    };
    return this.http.post<Cliente>(`${this.apiUrl}/login`, body);
  }
}
