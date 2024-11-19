import { TestBed } from '@angular/core/testing';

import { ComunidadesService } from './comunidad.service';

describe('ComunidadService', () => {
  let service: ComunidadesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComunidadesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
