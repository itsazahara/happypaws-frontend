import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuUsuarioService } from '../../services/menu-usuario.service';
import { ClienteDTO } from '../../models/cliente-dto';
import { Mascota } from '../../models/mascota';

@Component({
  selector: 'app-actualizar-usuario',
  standalone: false,
  templateUrl: './actualizar_usuario.component.html',
  styleUrls: ['./actualizar_usuario.component.scss']
})
export class ActualizarUsuarioComponent implements OnInit {
  cliente!: ClienteDTO;
  mascotas: Mascota[] = [];
  mascotasDelCliente: Mascota[] = [];

  constructor(
    private menuUsuarioService: MenuUsuarioService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Obtener el ID del cliente desde la URL (asumiendo que la ruta tiene un parámetro 'id')
    const clienteId = +this.activatedRoute.snapshot.paramMap.get('id')!;

    // Cargar los datos del cliente
    this.menuUsuarioService.obtenerClientePorId(clienteId).subscribe(cliente => {
      this.cliente = cliente;
    });

    // Cargar todas las mascotas
    this.menuUsuarioService.obtenerMascotas().subscribe(mascotas => {
      this.mascotas = mascotas;
    });
  }

  // Método para actualizar el cliente
  actualizarCliente(): void {
    const clienteId = this.cliente.id;
    this.menuUsuarioService.actualizarCliente(clienteId, this.cliente).subscribe(updatedCliente => {
      // Hacer algo con el cliente actualizado (por ejemplo, redirigir o mostrar un mensaje)
      console.log('Cliente actualizado', updatedCliente);
    });
  }
}
