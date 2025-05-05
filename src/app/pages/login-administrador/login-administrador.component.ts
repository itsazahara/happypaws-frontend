import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-administrador',
  standalone: false,
  templateUrl: './login-administrador.component.html',
  styleUrls: ['./login-administrador.component.scss']
})
export class LoginAdministradorComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  iniciarSesion() {
    if (this.email === 'admin@demo.com' && this.password === 'admin123') {
      alert('Login administrador exitoso');
      this.router.navigate(['/dashboard-admin']); // ajusta según tu ruta real
    } else {
      alert('Credenciales inválidas');
    }
  }
}
