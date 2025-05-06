import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/happypaws/api/clientes/login';

  constructor(private http: HttpClient) { }

  loginCliente(email: string, usuario:string, contrasenia: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email, usuario, contrasenia });
  }

}
