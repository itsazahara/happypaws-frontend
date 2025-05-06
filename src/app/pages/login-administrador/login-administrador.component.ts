import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-administrador',
  standalone: false,
  templateUrl: './login-administrador.component.html',
  styleUrls: ['./login-administrador.component.scss']
})
export class LoginAdministradorComponent {
  email: string = '';
  usuario: string = '';
  contrasenia: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  iniciarSesion() {
    // Si el campo email está vacío, usamos el usuario
    const valor = this.email ? this.email : this.usuario;

    this.authService.loginAdmin(valor, valor, this.contrasenia).subscribe(
      response => {
        alert('Login exitoso');
        this.router.navigate(['/menu_administrador']);
      },
      error => {
        alert('Credenciales inválidas');
      }
    );
  }
}
