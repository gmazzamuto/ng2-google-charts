import { TestBed } from '@angular/core/testing';

import { GoogleChartsLoaderService } from './google-charts-loader.service';

describe('GoogleChartsLoaderService', () => {
  let service: GoogleChartsLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleChartsLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
