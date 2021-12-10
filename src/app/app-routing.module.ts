import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ChartsGalleryComponent } from './charts-gallery/charts-gallery.component';
import { DashboardGalleryComponent } from './dashboard-gallery/dashboard-gallery.component';

import { Ng2GoogleChartsModule } from 'ng2-google-charts';


const routes: Routes = [
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
    ChartsGalleryComponent,
    DashboardGalleryComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    Ng2GoogleChartsModule,
    CommonModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
