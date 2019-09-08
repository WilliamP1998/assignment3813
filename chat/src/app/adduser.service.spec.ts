import { TestBed } from '@angular/core/testing';

import { AdduserService } from './adduser.service';

describe('AdduserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdduserService = TestBed.get(AdduserService);
    expect(service).toBeTruthy();
  });
});
