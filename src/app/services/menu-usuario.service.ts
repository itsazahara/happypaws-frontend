import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';
import { ClienteDTO } from '../models/cliente-dto';

@Injectable({
  providedIn: 'root'
})
export class MenuUsuarioService {

  private apiUrl = 'http://localhost:8080/clientes';  // URL base del controlador Spring

  constructor(private http: HttpClient) {}

  // Obtener todos los clientes
  obtenerClientes(): Observable<ClienteDTO[]> {
    return this.http.get<ClienteDTO[]>(this.apiUrl);
  }

  // Obtener cliente por ID
  obtenerClientePorId(id: number): Observable<ClienteDTO> {
    return this.http.get<ClienteDTO>(`${this.apiUrl}/${id}`);
  }

  // Crear nuevo cliente
  crearCliente(cliente: Cliente): Observable<ClienteDTO> {
    return this.http.post<ClienteDTO>(this.apiUrl, cliente);
  }

  // Actualizar cliente existente
  actualizarCliente(id: number, clienteDTO: ClienteDTO): Observable<ClienteDTO> {
    return this.http.put<ClienteDTO>(`${this.apiUrl}/${id}`, clienteDTO);
  }

  // Eliminar cliente por ID
  eliminarCliente(id: number): Observable<ClienteDTO> {
    return this.http.delete<ClienteDTO>(`${this.apiUrl}/${id}`);
  }

  // Actualizar campo "otrasMascotas"
  actualizarOtrasMascotas(id: number, valor: boolean): Observable<Cliente> {
    return this.http.put<Cliente>(
      `${this.apiUrl}/${id}/otras-mascotas?otrasMascotas=${valor}`,
      {}
    );
  }

  // Actualizar campo "experienciaMascotas"
  actualizarExperienciaMascotas(id: number, valor: boolean): Observable<Cliente> {
    return this.http.put<Cliente>(
      `${this.apiUrl}/${id}/experiencia-mascotas?experienciaMascotas=${valor}`,
      {}
    );
  }
}
