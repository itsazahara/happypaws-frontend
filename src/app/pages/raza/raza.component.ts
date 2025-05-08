import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RazaService } from '../../services/raza.service';
import { Raza } from '../../models/raza';

@Component({
  selector: 'app-raza',
  standalone: false,
  templateUrl: './raza.component.html',
  styleUrls: ['./raza.component.scss']
})
export class RazaComponent implements OnInit {
  razas: Raza[] = [];
  busqueda: string = '';

  razaForm: Raza = {
    id: 0,
    nombre: '',
    especie: '',
    imagen: ''
  };

  constructor(private razaService: RazaService, private router: Router) { }

  ngOnInit(): void {
    this.razaService.findAll().subscribe(data => {
      this.razas = data;
      console.log('RAZAS:', this.razas);
    });
  }

  cargarRazas(): void {
    this.razaService.findAll().subscribe(data => {
      this.razas = data;
    });
  }

  buscarRazas(): void {
    if (this.busqueda.trim() === '') {
      this.cargarRazas();
    } else {
      this.razaService.findByNombre(this.busqueda).subscribe(data => {
        this.razas = data;
      });
    }
  }

  guardarRaza(): void {
    if (this.razaForm.id) {
      // actualizar
      this.razaService.update(this.razaForm.id, this.razaForm).subscribe(() => {
        this.cargarRazas();
        this.resetForm();
      });
    } else {
      // crear
      this.razaService.create(this.razaForm).subscribe(() => {
        this.cargarRazas();
        this.resetForm();
      });
    }
  }

  editarRaza(raza: Raza): void {
    this.razaForm = { ...raza };
  }

  eliminarRaza(id: number): void {
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar esta raza?');

    if (confirmacion) {
      this.razaService.delete(id).subscribe(() => {
        this.cargarRazas();
      });
    }
  }

  cancelarEdicion(): void {
    this.resetForm();
  }

  private resetForm(): void {
    this.razaForm = {
      id: 0,
      nombre: '',
      especie: '',
      imagen: ''
    };
  }

  verMascotas(idRaza: number): void {
    this.router.navigate(['/mascotas-por-raza', idRaza]);
  }

}
