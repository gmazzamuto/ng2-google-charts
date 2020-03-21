import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { Ng2GoogleChartsModule } from 'ng2-google-charts';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    Ng2GoogleChartsModule
  ],
  providers: [
    //{provide: 'googleChartsVersion', useValue: '46'},
    //{provide: 'mapsApiKey', useValue: 'MYGOOGLEMAPSAPIKEY'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
