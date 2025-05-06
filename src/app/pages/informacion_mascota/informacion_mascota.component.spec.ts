import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionMascotaComponent } from './informacion_mascota.component';

describe('InformacionMascotaComponent', () => {
  let component: InformacionMascotaComponent;
  let fixture: ComponentFixture<InformacionMascotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InformacionMascotaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformacionMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
