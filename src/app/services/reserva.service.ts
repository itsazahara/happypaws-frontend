import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReservaDto } from '../models/reserva-dto';
import { ReservaRequestDto } from '../models/reserva-request-dto';
import { Reserva } from '../models/reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private apiUrl = 'http://localhost:8080/happypaws/api/reservas';

  constructor(private http: HttpClient) { }

  crearReserva(reserva: ReservaRequestDto): Observable<ReservaDto> {
    return this.http.post<ReservaDto>(this.apiUrl, reserva);
  }

  obtenerReservas(): Observable<ReservaDto[]> {
    return this.http.get<ReservaDto[]>(`${this.apiUrl}`);
  }

  actualizarEstado(id: number, nuevoEstado: string): Observable<ReservaDto> {
    // Construimos los parámetros de consulta
    const params = new HttpParams().set('nuevoEstado', nuevoEstado);

    // Llamamos al endpoint PUT con el parámetro nuevoEstado en query params y sin cuerpo (null)
    return this.http.put<ReservaDto>(`${this.apiUrl}/${id}/estado`, null, { params });
  }

  obtenerReservasPorEstado(estado: string): Observable<ReservaDto[]> {
    return this.http.get<ReservaDto[]>(`${this.apiUrl}/estado/${estado}`);
  }

  /*ordenarPorFecha(orden: 'asc' | 'desc'): Observable<Reserva[]> {
  return this.http.get<Reserva[]>(`${this.apiUrl}/ordenarPorFecha`, {
    params: new HttpParams().set('orden', orden)
  });
}*/

  obtenerReservaPorId(id: number): Observable<ReservaDto> {
    return this.http.get<ReservaDto>(`${this.apiUrl}/${id}`);
  }
}
