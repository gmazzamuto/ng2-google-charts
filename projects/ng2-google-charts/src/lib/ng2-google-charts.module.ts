import { NgModule } from '@angular/core';

import { GoogleChartComponent } from './google-chart/google-chart.component';
import { GoogleChartsLoaderService } from './google-charts-loader.service';
import { GoogleChartsDashboardComponent } from './google-charts-dashboard/google-charts-dashboard.component';
import { GoogleChartsControlComponent } from './google-charts-control/google-charts-control.component';

@NgModule({
    declarations: [
      GoogleChartComponent,
      GoogleChartsDashboardComponent,
      GoogleChartsControlComponent,
    ],
    providers: [
      GoogleChartsLoaderService
    ],
    exports: [
      GoogleChartComponent,
      GoogleChartsDashboardComponent,
      GoogleChartsControlComponent,
    ]
})
export class Ng2GoogleChartsModule {
}
