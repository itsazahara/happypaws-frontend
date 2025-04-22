import { Component, OnInit } from '@angular/core';
import { MascotaService } from '../../services/mascota.service';

@Component({
  selector: 'app-mascota',
  standalone: false,
  templateUrl: './mascota.component.html',
  styleUrls: ['./mascota.component.scss']
})
export class MascotaComponent implements OnInit {

  constructor(private mascotaService: MascotaService) {}

  mascotas: any[] = [];

  ngOnInit(): void {
    this.mascotaService.getMascotas().subscribe(
      (data) => {
        this.mascotas = data;
        console.log('Mascotas cargadas:', data);
      },
      (error) => {
        console.error('Error al obtener mascotas:', error);
      }
    );
  }



}
