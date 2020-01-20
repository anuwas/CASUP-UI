import { TestBed } from '@angular/core/testing';

import { SupitemService } from './supitem.service';

describe('SupitemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SupitemService = TestBed.get(SupitemService);
    expect(service).toBeTruthy();
  });
});
