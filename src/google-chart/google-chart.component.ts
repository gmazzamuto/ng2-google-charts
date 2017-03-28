declare var google: any;

import {
  Component,
  ElementRef,
  ChangeDetectionStrategy,
  OnChanges,
  Input,
  SimpleChanges
} from '@angular/core';

import { GoogleChartsLoaderService } from '../google-charts-loader.service';

@Component({
  selector: 'google-chart',
  template: '<div></div>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoogleChartComponent implements OnChanges {
  @Input() public data: any;

  private wrapper: any;

  private el: ElementRef;
  private loaderService: GoogleChartsLoaderService;

  public constructor(el: ElementRef,
                     loaderService: GoogleChartsLoaderService) {
    this.el = el;
    this.loaderService = loaderService;
  }

  public ngOnChanges(changes: SimpleChanges):void {
    let key = 'data';
    if (changes[key]) {
      if(!this.data) {
        return;
      }

      this.loaderService.load(this.data.chartType).then(() => {
        if(this.wrapper === undefined) {
          this.wrapper = new google.visualization.ChartWrapper(this.data);
        } else {
          this.wrapper.setDataTable(this.data.dataTable);
          this.wrapper.setOptions(this.data.options);
        }
        this.wrapper.draw(this.el.nativeElement.querySelector('div'));
      });
    }
  }
}
