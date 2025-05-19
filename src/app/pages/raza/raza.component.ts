import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RazaService } from '../../services/raza.service';
import { Raza } from '../../models/raza';
import { Especie } from '../../models/especie';

@Component({
  selector: 'app-raza',
  standalone: false,
  templateUrl: './raza.component.html',
  styleUrls: ['./raza.component.scss']
})
export class RazaComponent implements OnInit {
  razas: Raza[] = [];
  razasPaginadas: Raza[] = [];
  especies: Especie[] = [];
  filtroEspecie: Especie | '' = '';
  busqueda: string = '';
  razaForm: Raza = { id: 0, nombre: '', especie: '', imagen: '' };

  // Paginación
  currentPage: number = 1;
  itemsPerPage: number = 12;
  totalPages: number = 0;

  constructor(private razaService: RazaService, private router: Router) { }

  ngOnInit(): void {
    this.cargarRazas();
  }

  cargarRazas(): void {
    this.razaService.findAll().subscribe(data => {
      this.razas = data;

      // Obtener especies únicas a partir de las razas cargadas
      this.especies = Array.from(new Set(data.map(r => r.especie as Especie)));

      this.totalPages = Math.ceil(this.razas.length / this.itemsPerPage);
      this.actualizarPaginado();
    });
  }


  buscarRazas(): void {
    if (this.busqueda.trim() === '') {
      this.cargarRazas();
    } else {
      this.razaService.findByNombre(this.busqueda).subscribe(data => {
        this.razas = data;
        this.totalPages = Math.ceil(this.razas.length / this.itemsPerPage);
        this.currentPage = 1;
        this.actualizarPaginado();
      });
    }
  }

  actualizarPaginado(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.razasPaginadas = this.razas.slice(start, end);
  }

  cambiarPagina(pagina: number): void {
    this.currentPage = pagina;
    this.actualizarPaginado();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.actualizarPaginado();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.actualizarPaginado();
      window.scrollTo({ top: 0, behavior: 'smooth' });
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

  filtrarPorEspecie(): void {
    if (this.filtroEspecie === '') {
      this.cargarRazas(); // Mostrar todas si no hay filtro
    } else {
      this.razaService.findByEspecie(this.filtroEspecie).subscribe(data => {
        this.razas = data;
        this.totalPages = Math.ceil(this.razas.length / this.itemsPerPage);
        this.currentPage = 1;
        this.actualizarPaginado();
      });
    }
  }

}
