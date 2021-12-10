import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { GoogleChartsSettings } from 'ng2-google-charts';

// const MyGoogleChartsSettings: GoogleChartsSettings = {
//   mapsApiKey: 'YOUR_API_KEY',
//   googleChartsVersion: '51',
//   language: 'it',
//   safeMode: false,
// };

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
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
