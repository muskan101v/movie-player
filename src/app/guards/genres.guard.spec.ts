import { TestBed } from '@angular/core/testing';

import { GenresGuard } from './genres.guard';

describe('GenresGuard', () => {
  let guard: GenresGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GenresGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
