import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AdministradorDto } from '../../models/administrador-dto';

@Component({
  selector: 'app-login-administrador',
  standalone: false,
  templateUrl: './login-administrador.component.html',
  styleUrls: ['./login-administrador.component.scss']
})
export class LoginAdministradorComponent {
  email: string = '';
  contrasenia: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  iniciarSesion(): void {
    this.authService.loginAdmin(this.email, this.contrasenia).subscribe({
      next: (response: { token: string}) => {
        console.log('Admin autenticado:', response.token);
        localStorage.setItem('token', response.token);
        // Redirige al panel de admin
        this.router.navigate(['/menu_administrador']);
      },
      error: (error: any) => {
        console.error('Error en login del admin:', error);
        alert('Credenciales incorrectas');
      }
    });
  }
}
