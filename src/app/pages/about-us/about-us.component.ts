import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-us',
  standalone: false,
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {

  constructor(
    private router: Router
  ) { }

  preguntasFrecuentes(): void {
    this.router.navigate(['/preguntas-frecuentes']);
  }

}
