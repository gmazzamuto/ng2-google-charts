import { Injectable } from '@angular/core';

import { GoogleChartsLoaderService } from './google-charts-loader.service';
import { GoogleChartComponent, GoogleChartInterface } from './google-chart/google-chart.component';
import { GoogleChartWrapper } from './google-charts-interfaces';

function isComponent(chart: GoogleChartComponent | GoogleChartInterface): chart is GoogleChartComponent {
  return (chart as GoogleChartComponent).wrapper !== undefined;
}

declare var google: any;

export interface GoogleChartEditorOptions {
  dataSourceInput?: any;
}

@Injectable({
  providedIn: 'root'
})
export class GoogleChartEditor {

  chartEditor: any;

  private comp: GoogleChartComponent;

  public constructor(private loaderService: GoogleChartsLoaderService){}

  private async createEditor() {
    if (this.chartEditor !== undefined) {
      return;
    }
    await this.loaderService.load({ packages: ['charteditor'] });
    this.chartEditor = new google.visualization.ChartEditor();
    google.visualization.events.addListener(this.chartEditor, 'ok', () => {
      const wrapper = this.chartEditor.getChartWrapper();
      this.comp.wrapper = wrapper;
      this.comp.data.chartType = wrapper.getChartType();
      if (this.comp.data.options !== undefined || Object.isExtensible(this.comp.data)) {
        this.comp.data.options = wrapper.getOptions();
      }
      this.comp.wrapper.draw();
    });
  }

  public async openDialog(chart: GoogleChartComponent | GoogleChartInterface, options?: GoogleChartEditorOptions): Promise<GoogleChartWrapper | any> {
    await this.createEditor();

    return new Promise((resolve, reject) => {
      this.comp = isComponent(chart) ? chart : chart.component;
      this.chartEditor.openDialog(this.comp.wrapper, options);
      google.visualization.events.addListener(this.chartEditor, 'ok', () => {
        resolve(this.comp.wrapper);
      });
      google.visualization.events.addListener(this.chartEditor, 'cancel', () => {
        reject();
      });
    });
  }

}
