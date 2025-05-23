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
  razaForm: Raza = { nombre: '', especie: Especie.PERRO, imagen: '' };

  // Paginación
  currentPage: number = 1;
  itemsPerPage: number = 12;
  totalPages: number = 0;

  mostrarAlerta: boolean = false;
  mensajeAlerta: string = '';
  tipoAlerta: 'exito' | 'error' | 'nuevo' = 'exito';
  idRazaPendienteEliminar: number | null = null;
  mostrarConfirmacion: boolean = false;

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
    // Validación de campos obligatorios
    const camposObligatorios = [
      this.razaForm.nombre,
      this.razaForm.especie,
      this.razaForm.imagen
    ];

    const camposVacios = camposObligatorios.some(campo => campo === null || campo === undefined || campo === '');

    if (camposVacios) {
      this.tipoAlerta = 'error';
      this.mensajeAlerta = 'Por favor completa todos los campos antes de guardar la raza.';
      this.mostrarAlerta = true;

      setTimeout(() => this.mostrarAlerta = false, 3000);
      return;
    }

    // Si tiene ID, es una edición
    if (this.razaForm.id != null) {
      this.razaService.update(this.razaForm.id, this.razaForm).subscribe(() => {
        this.cargarRazas();
        this.resetForm();

        this.tipoAlerta = 'nuevo';
        this.mensajeAlerta = 'La raza ha sido actualizada exitosamente.';
        this.mostrarAlerta = true;

        setTimeout(() => this.mostrarAlerta = false, 3000);
      });
    } else {
      // Crear nueva raza
      this.razaService.create(this.razaForm).subscribe(() => {
        this.cargarRazas();
        this.resetForm();

        this.tipoAlerta = 'nuevo';
        this.mensajeAlerta = 'Raza agregada exitosamente.';
        this.mostrarAlerta = true;

        setTimeout(() => this.mostrarAlerta = false, 3000);
      }, error => {
        this.tipoAlerta = 'error';
        this.mensajeAlerta = 'Se ha producido un error al crear la raza.';
        this.mostrarAlerta = true;

        setTimeout(() => this.mostrarAlerta = false, 3000);
      });
    }
  }


  editarRaza(raza: Raza): void {
    this.razaForm = { ...raza };
  }

  confirmarEliminacion(id: number): void {
    this.idRazaPendienteEliminar = id;
    this.mostrarConfirmacion = true;
  }

  eliminarRazaConfirmada(): void {
    if (this.idRazaPendienteEliminar !== null) {
      this.razaService.delete(this.idRazaPendienteEliminar).subscribe({
        next: () => {
          this.razas = this.razas.filter(r => r.id !== this.idRazaPendienteEliminar);
          this.tipoAlerta = 'exito';
          this.mensajeAlerta = 'Raza eliminada exitosamente.';
          this.mostrarAlerta = true;
          this.mostrarConfirmacion = false;
          this.actualizarPaginado();

          setTimeout(() => {
            this.mostrarAlerta = false;
          }, 3000);
        },
        error: () => {
          this.tipoAlerta = 'error';
          this.mensajeAlerta = 'Se ha producido un error al eliminar la raza.';
          this.mostrarAlerta = true;
          this.mostrarConfirmacion = false;

          setTimeout(() => {
            this.mostrarAlerta = false;
          }, 3000);
        }
      });
    }
  }

  cancelarEliminacion(): void {
    this.mostrarConfirmacion = false;
    this.idRazaPendienteEliminar = null;
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
