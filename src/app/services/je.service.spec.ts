import { TestBed, inject } from '@angular/core/testing';

import { JEService } from './je.service';

describe('JEService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JEService]
    });
  });

  it('should be created', inject([JEService], (service: JEService) => {
    expect(service).toBeTruthy();
  }));
});
