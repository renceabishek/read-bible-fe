import { TestBed } from '@angular/core/testing';

import { BibledataService } from './bibledata.service';

describe('BibledataService', () => {
  let service: BibledataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BibledataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
