import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { gymMembershipGuard } from './gym-membership.guard';

describe('gymMembershipGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => gymMembershipGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
