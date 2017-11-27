import { TestBed, inject } from '@angular/core/testing';

import { Web3BaseService } from './web3-base.service';

describe('Web3BaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Web3BaseService]
    });
  });

  it('should be created', inject([Web3BaseService], (service: Web3BaseService) => {
    expect(service).toBeTruthy();
  }));
});
