import { TestBed } from '@angular/core/testing';

import { ServicioCafeteriaService } from './servicio-cafeteria.service';

describe('ServicioCafeteriaService', () => {
  let service: ServicioCafeteriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioCafeteriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
