import { TestBed } from '@angular/core/testing';

import { CarritoClickService } from './carrito-click.service';

describe('CarritoClickService', () => {
  let service: CarritoClickService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarritoClickService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
