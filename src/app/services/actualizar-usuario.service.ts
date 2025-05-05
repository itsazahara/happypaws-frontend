import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActualizarUsuarioService {
  private apiUrl = 'http://localhost:8080/happypaws/api/usuarios';

  constructor() { }
}
