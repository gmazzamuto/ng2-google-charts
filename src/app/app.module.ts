import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { Ng2GoogleChartsModule, GoogleChartsSettings } from 'ng2-google-charts';

import { ChartsGalleryComponent } from './charts-gallery/charts-gallery.component';
import { DashboardGalleryComponent } from './dashboard-gallery/dashboard-gallery.component';

// const MyGoogleChartsSettings: GoogleChartsSettings = {
  // mapsApiKey: 'YOUR_API_KEY',
  // googleChartsVersion: '47',
  // language: 'it',
  // safeMode: false,
// };

const appRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardGalleryComponent,
  },
  {
    path: '**',
    component: ChartsGalleryComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    ChartsGalleryComponent,
    DashboardGalleryComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
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
