import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  username = '';
  password = '';

  login() {
    console.log('Iniciar sesión con:', this.username, this.password);
    // Aquí puedes poner la lógica real para autenticar
  }

}
