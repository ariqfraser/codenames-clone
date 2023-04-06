import { TestBed } from '@angular/core/testing';

import { ScoreManagerService } from './score-manager.service';

describe('ScoreManagerService', () => {
  let service: ScoreManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoreManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
