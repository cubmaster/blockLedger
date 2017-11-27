import { TestBed, inject } from '@angular/core/testing';

import { PriceAPIService } from './price-api.service';

describe('PriceAPIService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PriceAPIService]
    });
  });

  it('should be created', inject([PriceAPIService], (service: PriceAPIService) => {
    expect(service).toBeTruthy();
  }));
});
