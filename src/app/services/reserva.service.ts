import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReservaDto } from '../models/reserva-dto';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private apiUrl = 'http://localhost:8080/happypaws/api/reservas';

  constructor(private http: HttpClient) { }

  crearReserva(reserva: ReservaDto): Observable<ReservaDto> {
    return this.http.post<ReservaDto>(this.apiUrl, reserva);
  }

}
