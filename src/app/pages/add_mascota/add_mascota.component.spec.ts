import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMascotaComponent } from './add_mascota.component';

describe('AddMascotaComponent', () => {
  let component: AddMascotaComponent;
  let fixture: ComponentFixture<AddMascotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddMascotaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
