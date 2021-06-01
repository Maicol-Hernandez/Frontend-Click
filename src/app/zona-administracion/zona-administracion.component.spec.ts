import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonaAdministracionComponent } from './zona-administracion.component';

describe('ZonaAdministracionComponent', () => {
  let component: ZonaAdministracionComponent;
  let fixture: ComponentFixture<ZonaAdministracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZonaAdministracionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonaAdministracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
