import { TestBed } from '@angular/core/testing';

import { DeterministicRandomService } from './deterministic-random.service';

describe('DeterministicRandomService', () => {
  let service: DeterministicRandomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeterministicRandomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
