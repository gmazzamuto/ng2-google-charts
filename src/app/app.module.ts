import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { Ng2GoogleChartsModule, GoogleChartsSettings } from 'ng2-google-charts';

// const MyGoogleChartsSettings: GoogleChartsSettings = {
  // mapsApiKey: 'YOUR_API_KEY',
  // googleChartsVersion: '47',
  // language: 'it',
  // safeMode: false,
// };

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    Ng2GoogleChartsModule
  ],
  providers: [
    // {
    //   provide: 'googleChartsSettings',
    //   useValue: MyGoogleChartsSettings,
    // },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
