import { TestBed } from '@angular/core/testing';

import { HairDonationService } from './hair-donation.service';

describe('HairDonationService', () => {
  let service: HairDonationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HairDonationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
