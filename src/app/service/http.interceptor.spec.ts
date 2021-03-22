import { TestBed } from '@angular/core/testing';

import { CustomHttpInterceptor } from './http.interceptor';

describe('HttpInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CustomHttpInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: CustomHttpInterceptor = TestBed.inject(CustomHttpInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
