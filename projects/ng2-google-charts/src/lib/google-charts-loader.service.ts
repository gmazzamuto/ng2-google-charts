declare var google: any;

import { Injectable, EventEmitter, LOCALE_ID, Inject, Optional } from '@angular/core';

@Injectable()
export class GoogleChartsLoaderService {

  private googleScriptLoadingNotifier: EventEmitter<boolean>;
  private googleScriptIsLoading: boolean;
  private localeId: string;

  public constructor(
    @Inject(LOCALE_ID) localeId: string,
    @Inject('googleChartsVersion') @Optional() private googleChartsVersion?: string,
    @Inject('mapsApiKey') @Optional() private mapsApiKey?: string
    ) {
    this.googleScriptLoadingNotifier = new EventEmitter();
    this.googleScriptIsLoading = false;
    this.localeId = localeId;
    if (this.googleChartsVersion === null) {
      this.googleChartsVersion = '46';
    }
  }

  public load(packages?: string[]): Promise<any> {
    return new Promise((resolve: any = Function.prototype, reject: any = Function.prototype) => {

      this.loadGoogleChartsScript().then(() => {
        const initializer: any = {
          language: this.localeId,
          callback: resolve,
          packages
        };
        if (this.mapsApiKey) {
          initializer.mapsApiKey = this.mapsApiKey;
        }
        google.charts.load(this.googleChartsVersion, initializer);
      }).catch(err => reject());
    });
  }

  private loadGoogleChartsScript(): Promise<any> {
    return new Promise((resolve: any = Function.prototype, reject: any = Function.prototype) => {

      if (typeof google !== 'undefined' && google.charts) {
        resolve();
      } else if (!this.googleScriptIsLoading) {

        this.googleScriptIsLoading = true;

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://www.gstatic.com/charts/loader.js';
        script.async = true;
        script.defer = true;
        script.onload = () => {
          this.googleScriptIsLoading = false;
          this.googleScriptLoadingNotifier.emit(true);
          resolve();
        };
        script.onerror = () => {
          this.googleScriptIsLoading = false;
          this.googleScriptLoadingNotifier.emit(false);
          reject();
        };
        document.getElementsByTagName('head')[0].appendChild(script);

      } else {
        this.googleScriptLoadingNotifier.subscribe((loaded: boolean) => {
          if (loaded) {
            resolve();
          } else {
            reject();
          }
        });
      }

    });
  }
}
