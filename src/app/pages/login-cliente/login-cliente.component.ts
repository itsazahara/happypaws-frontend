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
  contrasenia: string = '';
  error: string | null = null;
  cargando: boolean = false;
  mostrarAlerta: boolean = false;
  mensajeAlerta: string = '';
  tipoAlerta: 'exito' | 'error' = 'exito';
  mostrarContrasenia: boolean = false;

  constructor(private router: Router, private authService: AuthService) { }

  iniciarSesion() {
    this.cargando = true;

    this.authService.loginCliente(this.email, this.contrasenia).subscribe({
      next: (response) => {
        const token = response.token;
        this.authService.guardarSesionCliente(token);

        this.tipoAlerta = 'exito';
        this.mensajeAlerta = '¡Bienvenido/a de nuevo!';
        this.mostrarAlerta = true;

        setTimeout(() => {
          this.mostrarAlerta = false;
          this.router.navigate(['/menu_usuario']);
        }, 2350);
      },
      error: () => {
        this.tipoAlerta = 'error';
        this.mensajeAlerta = 'Credenciales inválidas';
        this.mostrarAlerta = true;

        setTimeout(() => {
          this.mostrarAlerta = false;
        }, 3000);
      },
      complete: () => {
        this.cargando = false;
      }
    });
  }

  toggleContrasenia() {
    this.mostrarContrasenia = !this.mostrarContrasenia;
  }

}
