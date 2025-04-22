import { Component } from '@angular/core';
import { MascotaService } from 'src/app/services/mascota.service';

@Component({
  selector: 'app-mascota',
  standalone: false,
  templateUrl: './mascota.component.html',
  styleUrl: './mascota.component.scss'
})
export class MascotaComponent implements OnInit {

  mascotas: any[] = [];  // 🔍 Esta propiedad sí existe

  constructor(private mascotaService: MascotaService) {}

  ngOnInit(): void {
    this.mascotaService.getMascotas().subscribe((data) => {
      this.mascotas = data;
    });
  }

}
