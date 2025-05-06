import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MascotaService } from '../../services/mascota.service';
import { Mascota } from '../../models/mascota';

@Component({
  selector: 'app-informacion-mascota',
  standalone: false,
  templateUrl: './informacion_mascota.component.html',
  styleUrls: ['./informacion_mascota.component.scss']
})
export class InformacionMascotaComponent implements OnInit {
  mascota!: Mascota;

  constructor(
    private route: ActivatedRoute,
    private mascotaService: MascotaService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.mascotaService.getMascotaPorId(+id).subscribe((data: Mascota) => {
        this.mascota = data;
      });
    }
  }
}
