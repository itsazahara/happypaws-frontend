import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'; // ✅ IMPORTADO
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { ClienteDTO } from '../models/cliente-dto';
import { AdministradorDto } from '../models/administrador-dto';
import { AuthResponse } from '../models/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/happypaws/api/auth';
  private jwtHelper = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private cookieService: CookieService // ✅ si usas cookies, debes inyectarla
  ) { }

  // Login del cliente
  loginCliente(email: string, contrasenia: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/authenticate`, { email, contrasenia }).pipe(
      tap((response: AuthResponse) => {
        localStorage.setItem('token', response.token);
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


  getClienteActual(): ClienteDTO | null {
  const clienteStr = this.cookieService.get('cliente');
  if (!clienteStr) {
    return null;
  }
  try {
    return JSON.parse(clienteStr) as ClienteDTO;
  } catch {
    return null;
  }
}



  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.clear();
  }

  getDecodedToken(): any | null {
    const token = this.getToken();
    if (token) {
      return this.jwtHelper.decodeToken(token);
    }
    return null;
  }
}
