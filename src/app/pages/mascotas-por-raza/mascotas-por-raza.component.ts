import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Mascota } from '../../models/mascota';

@Component({
  selector: 'app-mascotas-por-raza',
  standalone: false,
  templateUrl: './mascotas-por-raza.component.html',
  styleUrls: ['./mascotas-por-raza.component.scss']
})
export class MascotasPorRazaComponent implements OnInit {
  mascotas: Mascota[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const razaId = this.route.snapshot.paramMap.get('id');
    this.http.get<Mascota[]>(`http://localhost:8080/happypaws/api/mascotas/raza/${razaId}`)
      .subscribe(data => {
        this.mascotas = data;
      });
  }
}
