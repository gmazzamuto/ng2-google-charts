declare var google: any;

import { Injectable, EventEmitter, LOCALE_ID, Inject, Optional } from '@angular/core';
import { GoogleChartsSettings } from './google-charts-interfaces';

interface InternalGoogleChartsSettings extends GoogleChartsSettings {
  callback?(): any;
}

@Injectable({
  providedIn: 'root'
})
export class GoogleChartsLoaderService {

  private googleScriptLoadingNotifier: EventEmitter<boolean>;
  private googleScriptIsLoading: boolean;
  private localeId: string;
  private loadGoogleChartsScriptPromise: Promise<void>;

  public constructor(
    @Inject(LOCALE_ID) localeId: string,
    @Inject('googleChartsSettings') @Optional() private googleChartsSettings?: GoogleChartsSettings,
  ) {
    this.googleScriptLoadingNotifier = new EventEmitter();
    this.googleScriptIsLoading = false;
    this.localeId = localeId;

    this.loadGoogleChartsScriptPromise = new Promise((resolve, reject) => {
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

  public async load(settings?: GoogleChartsSettings): Promise<void> {
    await this.loadGoogleChartsScriptPromise;

    await new Promise((resolve) => {
      if (!settings) {
        settings = Object.create(this.googleChartsSettings);
      }
      if (!settings) {
        settings = {};
      }

      if (!settings.language) {
        settings.language = this.localeId;
      }

      if (!settings.googleChartsVersion) {
        settings.googleChartsVersion = '47';
      }

      const _settings: InternalGoogleChartsSettings = settings;
      _settings.callback = resolve;

      google.charts.load(settings.googleChartsVersion, _settings);
    });
  }
}
