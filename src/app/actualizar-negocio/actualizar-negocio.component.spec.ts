import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarNegocioComponent } from './actualizar-negocio.component';

describe('ActualizarNegocioComponent', () => {
  let component: ActualizarNegocioComponent;
  let fixture: ComponentFixture<ActualizarNegocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarNegocioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
