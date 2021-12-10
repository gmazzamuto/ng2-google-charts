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
  private googleChartLoadingNotifier: EventEmitter<void>;
  private googleScriptIsLoading: boolean;
  private googleChartIsLoading: boolean;
  private loadGoogleChartsScriptPromise: Promise<void>;
  private loadedPackages: string[] = [];
  private loaded = false;

  public constructor(
    @Inject(LOCALE_ID) localeId: string,
    @Inject('googleChartsSettings') @Optional() private googleChartsSettings: GoogleChartsSettings,
  ) {
    const defaultSettings: GoogleChartsSettings = {
      googleChartsVersion: '50',
      language: localeId,
    };
    this.googleChartsSettings = {...defaultSettings, ...this.googleChartsSettings};

    this.googleScriptLoadingNotifier = new EventEmitter();
    this.googleChartLoadingNotifier = new EventEmitter();
    this.googleScriptIsLoading = false;
    this.googleChartIsLoading = false;

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

      if (this.googleChartIsLoading) {
        this.googleChartLoadingNotifier.subscribe(() => {
          this.doLoad(resolve, settings);
        });

        return;
      }

      this.doLoad(resolve, settings);

    });
  }

  private doLoad(resolve: (value?: unknown) => void, settings?: GoogleChartsSettings) {
    settings = {...this.googleChartsSettings, ...settings}

    if (!settings.packages && this.loaded) {
      resolve();
      return;
    }

    if (settings.packages) {
      let pkgs = settings.packages.filter(p => this.loadedPackages.indexOf(p) < 0);

      if (pkgs.length == 0 && this.loaded) {
        resolve();
        return;
      }

      settings.packages = pkgs;
    }

    const _settings: InternalGoogleChartsSettings = settings;
    _settings.callback = () => {
      this.googleChartIsLoading = false;
      if (_settings.packages !== undefined) {
        this.loadedPackages = this.loadedPackages.concat(_settings.packages);
      }
      this.loaded = true;
      this.googleChartLoadingNotifier.emit();
      resolve();
    };

    this.googleChartIsLoading = true;
    google.charts.load(settings.googleChartsVersion, _settings);
  }
}
