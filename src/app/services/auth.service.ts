import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private clienteApiUrl = 'http://localhost:8080/happypaws/api/clientes/login';
  private adminApiUrl = 'http://localhost:8080/happypaws/api/administradores/login'

  constructor(private http: HttpClient) { }

  loginCliente(email: string, usuario:string, contrasenia: string): Observable<any> {
    return this.http.post<any>(this.clienteApiUrl, { email, usuario, contrasenia });
  }

  loginAdmin(email: string, usuario:string, contrasenia: string): Observable<any> {
    return this.http.post<any>(this.adminApiUrl, { email, usuario, contrasenia });
  }

}
