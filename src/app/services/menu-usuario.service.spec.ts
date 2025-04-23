import { TestBed } from '@angular/core/testing';

import { MenuUsuarioService } from './menu-usuario.service';

describe('MenuUsuarioService', () => {
  let service: MenuUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
