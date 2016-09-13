declare var google: any;

import { Injectable } from '@angular/core';

@Injectable()
export class GoogleChartsLoaderService {

  constructor() { }

  waitForLoaded(chartPackage) {
    return new Promise((resolve, reject) => {
      google.charts.load('current', {
        'packages': [chartPackage],
        'callback': resolve
      });
    });
  }
}
