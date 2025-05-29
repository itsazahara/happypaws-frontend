import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selector-rol',
  standalone: false,
  templateUrl: './selector-rol.component.html',
  styleUrls: ['./selector-rol.component.scss']
})
export class SelectorRolComponent {

  constructor(private router: Router) { }

  irLoginCliente() {
    this.router.navigate(['/login-cliente']);
  }

  irLoginAdmin() {
    this.router.navigate(['/login-admin']);
  }
}
