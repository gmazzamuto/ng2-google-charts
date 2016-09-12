/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GoogleChartsLoaderService } from './google-charts-loader.service';

describe('Service: GoogleChartsLoader', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleChartsLoaderService]
    });
  });

  it('should ...', inject([GoogleChartsLoaderService], (service: GoogleChartsLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
