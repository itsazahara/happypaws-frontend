import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-cliente',
  standalone: false,
  templateUrl: './login-cliente.component.html',
  styleUrls: ['./login-cliente.component.scss']
})
export class LoginClienteComponent {
  email: string = '';
  usuario: string = '';
  contrasenia: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  iniciarSesion() {
    // Si el campo email está vacío, usamos el usuario
    const valor = this.email ? this.email : this.usuario;

    this.authService.loginCliente(valor, valor, this.contrasenia).subscribe(
      response => {
        alert('Login exitoso');
        this.router.navigate(['/menu_usuario']);
      },
      error => {
        alert('Credenciales inválidas');
      }
    );
  }

}
