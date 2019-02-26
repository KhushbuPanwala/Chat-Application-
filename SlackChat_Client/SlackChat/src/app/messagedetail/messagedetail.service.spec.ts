import { TestBed } from '@angular/core/testing';

import { MessagedetailService } from './messagedetail.service';

describe('MessagedetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessagedetailService = TestBed.get(MessagedetailService);
    expect(service).toBeTruthy();
  });
});
