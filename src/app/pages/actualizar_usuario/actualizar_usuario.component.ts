import { Component } from '@angular/core';

@Component({
  selector: 'app-actualizar_usuario',
  standalone: false,
  templateUrl: './actualizar_usuario.component.html',
  styleUrl: './actualizar_usuario.component.scss'
})
export class ActualizarUsuarioComponent {

  usuario = {
    nombre: '',
    apellido: '',
    email: '',
    telefono: ''
  };

  actualizarUsuario() {
    console.log('Datos actualizados:', this.usuario);
    // Aquí puedes llamar a tu servicio para enviar los datos al backend
  }

}
