import { TestBed } from '@angular/core/testing';

import { UsersignalrService } from './usersignalr.service';

describe('UsersignalrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsersignalrService = TestBed.get(UsersignalrService);
    expect(service).toBeTruthy();
  });
});
