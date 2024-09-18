import { TestBed } from '@angular/core/testing';

import { DrugWingService } from './drug-wing.service';

describe('DrugWingService', () => {
  let service: DrugWingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrugWingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
