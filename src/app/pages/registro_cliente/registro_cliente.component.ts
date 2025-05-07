import { Component } from '@angular/core';
import { Cliente } from '../../models/cliente';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { TipoVivienda } from '../../models/tipo-vivienda';

@Component({
  selector: 'app-registro-cliente',
  standalone: false,
  templateUrl: './registro_cliente.component.html',
  styleUrl: './registro_cliente.component.scss'
})
export class RegistroClienteComponent {

  cliente: Cliente = {
    nombre: '',
    apellidos: '',
    email: '',
    usuario: '',
    contrasenia: '',
    direccion: '',
    edad: 0,
    telefono: '',
    ocupacionLaboral: '',
    tipoVivienda: TipoVivienda.CASA,
    otrasMascotas: false,
    experienciaMascotas: false,
    observaciones: '',
    imagen: '',
  };

  currentStep: number = 1;  // Controla el paso actual del formulario

  constructor(private clienteService: ClienteService, private router: Router) { }

  nextStep(): void {
    if (this.currentStep < 5) {
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  registrarCliente(): void {
    console.log('Registrando cliente:', this.cliente); // Ver qué se envía

    this.clienteService.crearCliente(this.cliente).subscribe({
      next: () => {
        alert('Cuenta creada con éxito');
        this.router.navigate(['/menu_usuario']);
      },
      error: (error) => {
        console.error('Error al registrar:', error); // Mira aquí el detalle del error
        alert('Error al registrar el cliente');
      }
    });
  }

}
