import { TestBed } from '@angular/core/testing';

import { LcgService } from './lcg.service';

describe('LcgService', () => {
  let service: LcgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LcgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
