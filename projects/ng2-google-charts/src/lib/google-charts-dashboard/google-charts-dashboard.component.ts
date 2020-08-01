declare var google: any;

import {
  Component,
  ElementRef,
  OnInit,
  OnDestroy,
  Input,
} from '@angular/core';

import { GoogleChartsLoaderService } from '../google-charts-loader.service';
import { GoogleChartsDataTableInterface } from '../google-charts-datatable';
import { GoogleChartsControlInterface } from '../google-charts-control/google-charts-control.component';
import { GoogleChartInterface } from '../google-chart/google-chart.component';
import { GoogleChartsDataTable } from '../google-charts-datatable';

export interface GoogleChartsDashboardInterface extends
 GoogleChartsDataTableInterface {
  bind: [
    GoogleChartsControlInterface | GoogleChartsControlInterface[],
    GoogleChartInterface | GoogleChartInterface[]
  ][];
  component?: GoogleChartsDashboardComponent;
}

@Component({
  selector: 'google-charts-dashboard',
  template: '<div></div>',
})
export class GoogleChartsDashboardComponent implements OnInit, OnDestroy {

  @Input() public data!: GoogleChartsDashboardInterface;

  public dashboard: any;
  public dataTable!: GoogleChartsDataTable;

  public constructor(private el: ElementRef,
                     private loaderService: GoogleChartsLoaderService) {
    this.el = el;
    this.loaderService = loaderService;
  }

  ngOnInit() {
    this.data.component = this;

    this.init().then(() => {
      if (!this.dataTable) {
        this.dataTable = new GoogleChartsDataTable(this.data);
        this.dataTable.dataTableChanged.subscribe((dt: any) => {
          this._draw();
        });
      }
      this.draw();
    });
  }

  ngOnDestroy() {
    this.el.nativeElement.innerHTML = '';
    this.el.nativeElement.remove();
    try {
      Object.keys(this.dashboard).forEach((key) => { delete this.dashboard[key]; });
      delete this.dashboard;
    } catch (e) {}
  }

  public async init() {
    await this.loaderService.load({packages: ['controls'] });

    this.dashboard = new google.visualization.Dashboard(
      this.el.nativeElement.querySelector('div'));

    for (const b of this.data.bind) {
      let controls = b[0];
      let charts = b[1];

      if (!(controls instanceof Array)) {
        controls = [controls];
      }

      if (!(charts instanceof Array)) {
        charts = [charts];
      }

      for (const c of controls) {
        await c.component!.ensureInit();
      }

      for (const c of charts) {
        if (!c.component) {
          continue;
        }
        await c.component.init();
        const data = c.component.data;
        if (data.dataTable !== undefined || data.dataSourceUrl !== undefined) {
          throw Error('dataTable and dataSourceUrl cannot be specified when ' +
                      'chart is drawn in a Dashboard');
        }
      }

      this.dashboard.bind(controls.map(x => x.component!.wrapper),
                          charts.map(x => x.component!.wrapper));
    }
  }

  public draw(value?: GoogleChartInterface) {
    this.dataTable.init(value);
  }

  private _draw() {
    this.dashboard.draw(this.dataTable.getDataTable());
  }
}
