import { Component, OnInit } from '@angular/core';
import { AdministradorDto } from '../../models/administrador-dto';
import { AdministradorService } from '../../services/administrador.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-datos-administrador',
  standalone: false,
  templateUrl: './datos-administrador.component.html',
  styleUrl: './datos-administrador.component.scss'
})
export class DatosAdministradorComponent implements OnInit {

  administrador: AdministradorDto = {
    id: 0,
    nombre: '',
    apellidos: '',
    usuario: '',
    telefono: '',
    email: '',
    imagen: ''
  };

  cargando: boolean = true;

  constructor(
    private administradorService: AdministradorService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const email = this.authService.getAdminEmailFromToken(); // 🔹 devuelve string | null
    if (email) {
      this.administradorService.obtenerAdminPorEmail(email).subscribe({
        next: (administradorDTO) => {
          this.administrador = administradorDTO;
          this.cargando = false;
        },
        error: (err) => {
          console.error('Error al obtener administrador:', err);
          this.cargando = false;
        }
      });
    } else {
      console.error('No se pudo obtener el email del token');
      this.cargando = false;
    }
  }
}
