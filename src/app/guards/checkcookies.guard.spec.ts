import { TestBed } from '@angular/core/testing';

import { CheckcookiesGuard } from './checkcookies.guard';

describe('CheckcookiesGuard', () => {
  let guard: CheckcookiesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckcookiesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
