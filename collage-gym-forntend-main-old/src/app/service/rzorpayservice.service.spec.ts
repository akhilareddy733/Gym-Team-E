import { TestBed } from '@angular/core/testing';

import { RzorpayserviceService } from './rzorpayservice.service';

describe('RzorpayserviceService', () => {
  let service: RzorpayserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RzorpayserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
