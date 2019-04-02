import { TestBed, inject } from '@angular/core/testing';

import { DistributionPointService } from './distribution-point.service';

describe('DistributionPointService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DistributionPointService]
    });
  });

  it('should be created', inject([DistributionPointService], (service: DistributionPointService) => {
    expect(service).toBeTruthy();
  }));
});
