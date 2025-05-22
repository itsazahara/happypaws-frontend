import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ClienteDTO } from '../../models/cliente-dto';

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

  constructor(private router: Router, private authService: AuthService) { }

  iniciarSesion() {
    this.cargando = true;

    this.authService.loginCliente(this.email, this.contrasenia).subscribe({
      next: (response) => {
        const token = response.token;
        this.authService.guardarSesionCliente(token);

        this.mostrarAlerta = true;
        setTimeout(() => {
          this.router.navigate(['/menu_usuario']);
        }, 2350); // espera 2 segundos antes de redirigir
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
