import { TestBed } from '@angular/core/testing';

import { RelayControllerApiService } from './relay-controller-api.service';

describe('RelayControllerApiService', () => {
  let service: RelayControllerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelayControllerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
