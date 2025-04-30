import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuUsuarioService } from '../../services/menu-usuario.service';

@Component({
  selector: 'app-menu_usuario',
  standalone: false,
  templateUrl: './menu_usuario.component.html',
  styleUrls: ['./menu_usuario.component.scss']
})
export class MenuUsuarioComponent implements OnInit {
  mascotas: any[] = [];
  mascotasFiltradas: any[] = [];
  busqueda: string = '';
  filtro = {
    tipo: '',
    edad: null
  };

  constructor(private menuUsuarioService: MenuUsuarioService) {}

  ngOnInit(): void {
    this.obtenerMascotas();
  }

  // Método para obtener las mascotas desde el servicio
  obtenerMascotas(): void {
    this.menuUsuarioService.obtenerMascotas().subscribe(
      (data) => {
        this.mascotas = data;  // Asigna las mascotas recibidas a la variable
        console.log(this.mascotas);  // Verifica los datos en la consola
      },
      (error) => {
        console.error('Error al obtener las mascotas:', error);  // Maneja el error si ocurre
      }
    );
  }

  //ESTO ESTA MAL PORQUE NO TIENE IMPLEMENTADO NINGUN MODEL
}
