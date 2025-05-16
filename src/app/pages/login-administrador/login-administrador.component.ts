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
  error: string | null = null;
  cargando: boolean = false;

  constructor(private router: Router, private authService: AuthService) { }

  iniciarSesion() {
    this.cargando = true;

    this.authService.loginAdmin(this.email, this.contrasenia).subscribe({
      next: (response) => {
        const token = response.token;
        this.authService.guardarSesionAdmin(token);

        alert('Login exitoso');
        this.router.navigate(['/menu_administrador']);
      },
      error: (error) => {
        console.error('Error al iniciar sesión', error);
        this.error = 'Credenciales inválidas o error en el servidor';
        alert(this.error);
      },
      complete: () => {
        this.cargando = false;
      }
    });
  }
}
