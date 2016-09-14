import { NgModule } from '@angular/core';

import { GoogleChartComponent } from "./google-chart/google-chart.component";
import { GoogleChartsLoaderService } from "./google-charts-loader.service";

@NgModule({
    declarations: [
      GoogleChartComponent,
    ],
    providers: [
      GoogleChartsLoaderService,
    ],
    exports: [
      GoogleChartComponent,
    ]
})
export class Ng2GoogleChartsModule {
}
