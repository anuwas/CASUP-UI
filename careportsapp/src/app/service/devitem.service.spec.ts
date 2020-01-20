import { TestBed } from '@angular/core/testing';

import { DevitemService } from './devitem.service';

describe('DevitemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DevitemService = TestBed.get(DevitemService);
    expect(service).toBeTruthy();
  });
});
