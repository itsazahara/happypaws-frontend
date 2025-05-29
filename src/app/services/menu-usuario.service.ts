import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';
import { ClienteDTO } from '../models/cliente-dto';
import { Mascota } from '../models/mascota';

@Injectable({
  providedIn: 'root'
})
export class MenuUsuarioService {

  private apiUrl = 'http://localhost:8080/happypaws/api/clientes';

  constructor(private http: HttpClient) { }

  obtenerClientes(): Observable<ClienteDTO[]> {
    return this.http.get<ClienteDTO[]>(this.apiUrl);
  }

  obtenerClientePorId(id: number): Observable<ClienteDTO> {
    return this.http.get<ClienteDTO>(`${this.apiUrl}/${id}`);
  }

  crearCliente(cliente: Cliente): Observable<ClienteDTO> {
    return this.http.post<ClienteDTO>(this.apiUrl, cliente);
  }

  actualizarCliente(id: number, clienteDTO: ClienteDTO): Observable<ClienteDTO> {
    return this.http.put<ClienteDTO>(`${this.apiUrl}/${id}`, clienteDTO);
  }

  eliminarCliente(id: number): Observable<ClienteDTO> {
    return this.http.delete<ClienteDTO>(`${this.apiUrl}/${id}`);
  }

  actualizarOtrasMascotas(id: number, valor: boolean): Observable<Cliente> {
    return this.http.put<Cliente>(
      `${this.apiUrl}/${id}/otras-mascotas?otrasMascotas=${valor}`,
      {}
    );
  }

  actualizarExperienciaMascotas(id: number, valor: boolean): Observable<Cliente> {
    return this.http.put<Cliente>(
      `${this.apiUrl}/${id}/experiencia-mascotas?experienciaMascotas=${valor}`,
      {}
    );
  }

  obtenerMascotas(): Observable<Mascota[]> {
    return this.http.get<Mascota[]>('http://localhost:8080/happypaws/api/mascotas');
  }

  obtenerMascotaPorId(id: number): Observable<Mascota> {
    return this.http.get<Mascota>('http://localhost:8080/happypaws/api/mascotas/${id}');
  }

}
