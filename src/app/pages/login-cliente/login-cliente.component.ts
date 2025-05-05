import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-cliente',
  standalone: false,
  templateUrl: './login-cliente.component.html',
  styleUrls: ['./login-cliente.component.scss']
})
export class LoginClienteComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  iniciarSesion() {
    if (this.email === 'cliente@demo.com' && this.password === '1234') {
      // Simulación de login exitoso
      alert('Login exitoso');
      this.router.navigate(['/dashboard-cliente']); // ajusta según tus rutas
    } else {
      alert('Credenciales inválidas');
    }
  }
}
