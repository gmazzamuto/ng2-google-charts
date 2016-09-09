declare var google: any;

import { Injectable } from '@angular/core';

@Injectable()
export class GoogleChartsLoaderService {

  isLoaded: boolean = false;
  loadCalled: boolean = false;

  constructor() { }

  load() {
    return new Promise((resolve, reject) => {
      if(this.isLoaded) {
        resolve();
        return;
      }
      if(!this.loadCalled) {
        this.loadCalled = true;
        google.charts.load('current', {'packages': ['corechart', 'gauge']});
      }
      let i = 0;
      function checkIfLoaded() {
        if(google.visualization !== undefined)
          resolve();
        if(i < 10) {
          setTimeout(checkIfLoaded, 200);
          i += 1;
        }
        else {
          reject();
        }
      };
      checkIfLoaded();
    }).then(() => this.isLoaded = true);
  }
}
