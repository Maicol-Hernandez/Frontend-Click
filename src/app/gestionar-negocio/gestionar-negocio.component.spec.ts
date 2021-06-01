import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarNegocioComponent } from './gestionar-negocio.component';

describe('GestionarNegocioComponent', () => {
  let component: GestionarNegocioComponent;
  let fixture: ComponentFixture<GestionarNegocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionarNegocioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
