import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Raza } from '../models/raza';
import { Especie } from '../models/especie';

@Injectable({
  providedIn: 'root'
})
export class RazaService {
  private apiUrl = 'http://localhost:8080/happypaws/api/razas';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Raza[]> {
    return this.http.get<Raza[]>(this.apiUrl);
  }

  findById(id: number): Observable<Raza> {
    return this.http.get<Raza>(`${this.apiUrl}/${id}`);
  }

  create(raza: Raza): Observable<Raza> {
    return this.http.post<Raza>(this.apiUrl, raza);
  }

  update(id: number, raza: Raza): Observable<Raza> {
    return this.http.put<Raza>(`${this.apiUrl}/${id}`, raza);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  findByNombre(nombre: string): Observable<Raza[]> {
    const params = new HttpParams().set('nombre', nombre);
    return this.http.get<Raza[]>(`${this.apiUrl}/buscador`, { params });
  }

  findByEspecie(especie: Especie) {
    return this.http.get<Raza[]>(`${this.apiUrl}/buscarPorEspecie?especie=${especie}`);
  }

}
