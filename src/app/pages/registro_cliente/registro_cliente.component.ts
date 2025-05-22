import { Component } from '@angular/core';
import { Cliente } from '../../models/cliente';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Usamos AuthService para registrar y obtener token
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
  mostrarAlerta: boolean = false;
  mensajeAlerta: string = '';
  tipoAlerta: 'exito' | 'error' = 'exito';

  constructor(private authService: AuthService, private router: Router) { }

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
    // Validación adicional
    const camposObligatorios = [
      this.cliente.usuario,
      this.cliente.nombre,
      this.cliente.apellidos,
      this.cliente.email,
      this.cliente.contrasenia,
      this.cliente.direccion,
      this.cliente.edad,
      this.cliente.telefono,
      this.cliente.ocupacionLaboral,
      this.cliente.tipoVivienda
    ];

    const camposVacios = camposObligatorios.some(campo => campo === null || campo === undefined || campo === '' || campo === 0);

    if (camposVacios) {
      alert('Por favor completa todos los campos obligatorios antes de registrarte.');
      return;
    }

    // Aquí llamamos al método registrarCliente de AuthService que devuelve token
    this.authService.registrarCliente(this.cliente).subscribe({
      next: () => {
        this.tipoAlerta = 'exito';
        this.mensajeAlerta = '¡Bienvenido/a a Happypaws!';
        this.mostrarAlerta = true;

        setTimeout(() => {
          this.mostrarAlerta = false;
          this.router.navigate(['/menu_usuario']);
        }, 2350);
      },
      error: () => {
        this.tipoAlerta = 'error';
        this.mensajeAlerta = 'Los datos introducidos no son válidos.';
        this.mostrarAlerta = true;

        setTimeout(() => {
          this.mostrarAlerta = false;
        }, 3000);
      }
    });
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.cliente.imagen = reader.result as string;  // Guarda la imagen como Base64
      };
      reader.readAsDataURL(file); // Convierte a Base64
    }
  }

}
