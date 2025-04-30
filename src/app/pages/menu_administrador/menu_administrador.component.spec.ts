import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAdministradorComponent } from './menu_administrador.component';

describe('MenuAdministradorComponent', () => {
  let component: MenuAdministradorComponent;
  let fixture: ComponentFixture<MenuAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuAdministradorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
