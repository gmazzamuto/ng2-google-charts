import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { GoogleChartsModule } from '../modules/google-charts/google-charts.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    GoogleChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
