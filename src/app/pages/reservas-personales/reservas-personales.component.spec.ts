import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasPersonalesComponent } from './reservas-personales.component';

describe('ReservasPersonalesComponent', () => {
  let component: ReservasPersonalesComponent;
  let fixture: ComponentFixture<ReservasPersonalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservasPersonalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservasPersonalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
