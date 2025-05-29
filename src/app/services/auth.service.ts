import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'; // ✅ IMPORTADO
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { AuthResponse } from '../models/auth-response';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/happypaws/api/auth';
  private jwtHelper = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  // Login del cliente
  loginCliente(email: string, contrasenia: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/authenticate`, { email, contrasenia }).pipe(
      tap((response: AuthResponse) => {
        this.guardarSesionCliente(response.token);
      })
    );
  }

  // Login del admin
  loginAdmin(email: string, contrasenia: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/authenticateAdmin`, { email, contrasenia }).pipe(
      tap((response: AuthResponse) => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  // Guardar token y datos del usuario en cookies
  guardarSesionCliente(token: string): void {
    this.cookieService.set('token', token, { expires: 1 });
  }

  guardarSesionAdmin(token: string): void {
    this.cookieService.set('token', token, { expires: 1 });
  }

  getClienteEmailFromToken(): string | null {
    const token = this.getToken();
    if (token) {
      const decoded = this.jwtHelper.decodeToken(token);
      return decoded?.sub || null;
    }
    return null;
  }

  getAdminEmailFromToken(): string | null {
    const token = this.getToken();
    if (token) {
      const decoded = this.jwtHelper.decodeToken(token);
      return decoded?.sub || null;
    }
    return null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return this.cookieService.get('token') || null;
  }

  logout(): void {
    this.cookieService.delete('token');
  }

  getDecodedToken(): any | null {
    const token = this.getToken();
    if (token) {
      return this.jwtHelper.decodeToken(token);
    }
    return null;
  }

  registrarCliente(cliente: Cliente): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, cliente).pipe(
      tap((response: AuthResponse) => {
        this.guardarSesionCliente(response.token);
      })
    );
  }

}
