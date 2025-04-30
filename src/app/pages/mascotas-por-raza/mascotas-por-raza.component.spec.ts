import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotasPorRazaComponent } from './mascotas-por-raza.component';

describe('MascotasPorRazaComponent', () => {
  let component: MascotasPorRazaComponent;
  let fixture: ComponentFixture<MascotasPorRazaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MascotasPorRazaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MascotasPorRazaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
